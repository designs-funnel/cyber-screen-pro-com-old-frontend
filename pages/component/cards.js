import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { SocialIcon } from "react-social-icons";
import LoaderComponent from "./loaderComponent";
import { FaImage, FaVideo } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import { loadImage } from "../../utils/utils";
import styles from "../../styles/navbar.module.css";

function Cards({ data, label, color }) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sorted = data
      ?.slice()
      .sort((a, b) => new Date(b.time) - new Date(a.time));
    setSortedData(sorted);
  }, [data]);

  return (
    <Container>
      {!data && <LoaderComponent />}
      {sortedData?.length > 0 && (
        <>
          <Row className={styles.custom_card_label}>
            <Col>
              <div className="p-lg-2">
                <p
                  style={{ backgroundColor: `${color}`, color: "black" }}
                  className="py-lg-2 px-lg-3 d-inline-block"
                >
                  {label} Posts {`(${sortedData?.length})`}
                </p>
              </div>
            </Col>
          </Row>

          <Row xs={1} md={2} className="g-4 pt-lg-3 pb-lg-5">
            {sortedData?.map((report, index) => (
              <Col key={index}>
                <Card style={{ backgroundColor: color, height: "auto" }}>
                  {report.image && (
                    <Card.Header>
                      <div className="d-flex justify-content-center">
                        <img
                          src={
                            report?.image
                              ? loadImage(report?.image)
                              : "assests/logo.png"
                          }
                          alt="icon"
                          style={{
                            height: "200px",
                            width: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Card.Header>
                  )}
                  <Card.Body>
                    {/* <h7 className=" h-50">{`(${index + 1})`}</h7> */}
                    <h6 className=" h-50">{report.text}</h6>
                    <h6 className=" h-50">
                      {"Date: " + new Date(report.time)}
                    </h6>
                    <Card.Text className=" h-50">
                      Label Reason: {report.label_reason}
                    </Card.Text>
                    <div className="d-flex  flex-column gap-2 align-items-start">
                      <div className=" d-flex  flex-row gap-2">
                        {report?.tags?.map((tag) => (
                          <Button
                            style={{
                              backgroundColor: "#cbcbcb",
                              color: "black",
                            }}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                      <div className="d-flex  flex-row gap-2 align-items-center justify-content-start">
                        <div>
                          {report?.media_type === "photo" && (
                            <FaImage
                              style={{ height: "30px", width: "30px" }}
                            />
                          )}
                          {report?.media_type === "video" && (
                            <FaVideo
                              style={{ height: "30px", width: "30px" }}
                            />
                          )}
                        </div>

                        <div>
                          <SocialIcon
                            url={report?.url}
                            style={{ height: "25px", width: "25px" }}
                          />
                        </div>

                        <div style={{ cursor: "pointer" }}>
                          <Link href={report?.url || '#'}>
                            <img
                              src="/assests/external-link-icon-png-29.jpg"
                              alt="External Link Icon"
                              style={{ height: "25px" }}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Cards;
