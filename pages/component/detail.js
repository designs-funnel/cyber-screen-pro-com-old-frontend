import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import { SocialIcon } from "react-social-icons";

import { PieChart } from "react-minimal-pie-chart";
import CardComponent from "./cardComponent";
import { color3, loadImage } from "../../utils/utils";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { token } from "../../utils/utils";
import { useRouter } from "next/router";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

const Detail = () => {
  const router = useRouter();
  const emp = router.query.employee && JSON.parse(router.query.employee);
  const [data, setData] = useState();

  useEffect(() => {
    if (!emp?._id) return;

    console.log({ employee: emp });

    const fetchData = async () => {
      const tid = toast.loading("Loading");
      try {
        const response = await axios.post(
          `${BACKEND}/employee-scan-report/${emp._id}`,
          { useCache: true },
          token(localStorage)
        );
        setData(response.data.report);
      } catch (error) {
        toast.error(error.message);
      } finally {
        toast.dismiss(tid);
      }
    };

    fetchData();
  }, [router.query.employee]);

  const chartData = (counts) => [
    { title: "Positive", value: counts?.Positive || 0, color: "#a3ffab" },
    { title: "Neutral", value: counts?.Neutral || 0, color: "#fdffa3" },
    { title: "Negative", value: counts?.Negative || 0, color: " #ffa3a3" },
  ];

  return (
    <>
      <Container>
        {emp ? (
          <>
            <Row className=" pt-4 pb-3">
              <Col xs={12} md={4}>
                {data?.userProfiles?.map((userProfile) => (
                  <div
                    key={userProfile._id}
                    className="d-flex align-items-center mb-3"
                  >
                    <div className="d-flex justify-content-center align-items-center gap-3 text-center">
                      <div className="col-1">
                        <SocialIcon
                          url={userProfile?.profile_url}
                          style={{ height: "35px", width: "35px" }}
                        />
                      </div>
                      <div className="col-3">
                        <h4>{userProfile?.platform}</h4>
                      </div>
                      <div>
                        <img
                          src={
                            userProfile?.user_image
                              ? loadImage(userProfile?.user_image)
                              : "assests/logo.png"
                          }
                          alt="icon"
                          style={{ height: "50px", width: "50px" }}
                        />
                      </div>
                      <div style={{ height: "30%" }}>
                        <h2 className=" pb-lg-1">
                          {!data
                            ? "Loading..."
                            : userProfile?.username || "Name"}
                        </h2>
                        <h5 className="pt-1">{userProfile?.user_info}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </Col>
              <Col
                xs={6}
                md={4}
                className="d-flex justify-content-center align-items-center"
              >
                <div className=" d-flex justify-content-end align-items-center gap-3">
                  <div className="col-2"></div>
                  <div className="col-8 " style={{ height: "50%" }}>
                    {emp?.posts_count === 0 && <div>No Posts Found</div>}
                    {emp?.posts_count > 0 && <div>Posts Info:</div>}
                    <PieChart
                      data={chartData(emp?.counts)}
                      labelStyle={() => ({
                        fill: "black",
                        fontSize: "9px",
                        fontFamily: "Arial, sans-serif",
                        width: "20px",
                      })}
                    />
                  </div>
                  <div className="col-2"></div>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="">
                  <h> Social Accounts </h>
                  <div className=" d-flex  pt-sm-3 pb-sm-2  align-items-center gap-3">
                    {!emp
                      ? "Loading..."
                      : emp?.socialLinks?.map((link) => (
                          <SocialIcon
                            url={link}
                            style={{ height: "25px", width: "25px" }}
                          />
                        ))}
                  </div>
                </div>
              </Col>
            </Row>
            <div
              style={{ backgroundColor: color3, color: "black" }}
              className="navbar navbar-expand navbar-light p-sm-2"
            ></div>

            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
            >
              <Row className="  pt-sm-4 pb-sm-3">
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="#link1">
                      <CardComponent data={data?.posts} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </>
        ) : (
          <div className="col-8 d-flex align-items-md-center justify-content-center pt-lg-5 w-100">
            <h4>No employee selected to view detail</h4>
          </div>
        )}
      </Container>
    </>
  );
};

export default Detail;
