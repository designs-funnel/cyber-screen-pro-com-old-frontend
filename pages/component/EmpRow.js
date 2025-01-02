import { color1, token, loadImage, sleep } from "../../utils/utils";

import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { PieChart } from "react-minimal-pie-chart";
import { SocialIcon } from "react-social-icons";
import Spinner from "react-bootstrap/Spinner";
import styles from "../../styles/navbar.module.css";
import { toast } from "react-toastify";
import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

const EmpRow = ({ emp, getEmployees }) => {
  const [loading, setLoading] = useState(false);

  const chartData = (counts) => [
    { title: "Positive", value: counts?.Positive || 0, color: "#a3ffab" },
    { title: "Neutral", value: counts?.Neutral || 0, color: "#fdffa3" },
    { title: "Negative", value: counts?.Negative || 0, color: " #ffa3a3" },
  ];

  const handleScanEmployee = async (employeeId) => {
    try {
      setLoading(true);
      await axios.post(
        `${BACKEND}/employee-scan-report/${employeeId}`,
        { useCache: false },
        token(localStorage)
      );
      await sleep(2000);
      getEmployees();
    } catch (error) {
      const message = error?.message;
      const data = error?.response?.data;
      const err = `Error is ${message} ${
        (data && JSON.stringify(data, 0, 2)) || ""
      } Date: ${new Date()}`;
      toast.error("Please wait some time before starting another scan");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row key={emp?._id} className={`${styles.custom_box_contanner_row} g-2`}>
      <Col xs={3} sm={2}>
        <div className={styles.custom_box_contanner_row_data}>
          <img
            // src={"/assests/x.jpeg"}
            src={
              emp?.user_image
                ? loadImage(emp?.user_image)
                : "assests/profile.png"
            }
            style={{ height: "35px", width: "35px" }}
            alt="icon"
          />
          <Link
            className={styles.custom_box_contanner_Link}
            href={{
              pathname: "/component/detail",
              query: { employee: JSON.stringify(emp) },
            }}
          >
            <p className={styles.custom_box_emp_name}>{emp?.name || "..."}</p>
          </Link>
        </div>
      </Col>
      <Col xs={3} sm={2} className={styles.custom_box_emp_email}>
        <div className={styles.custom_box_contanner_row_data}>
          <a>{emp?.email}</a>
        </div>
      </Col>
      <Col xs={2} sm={1}>
        <div className={styles.custom_box_contanner_row_data}>
          <a>
            <div
              className={styles.custom_boxImg}
              style={{ width: "70%", height: "70%" }}
            >
              {!emp?.counts ? "" : <PieChart data={chartData(emp?.counts)} />}
            </div>
          </a>
        </div>
      </Col>
      <Col xs={1} sm={1}>
        <div className={styles.custom_box_contanner_row_data}>
          <a>{emp?.posts_count || ""}</a>
        </div>
      </Col>
      <Col xs={2} sm={2}>
        <div className={styles.custom_box_contanner_row_data}>
          {emp?.socialLinks?.map((link, id) => (
            <SocialIcon
              key={id}
              url={link}
              style={{ height: "25px", width: "25px" }}
            />
          ))}
        </div>
      </Col>
      <Col xs={2} sm={2}>
        <div className={styles.custom_box_contanner_row_data}>
          <a>
            {(loading && "Scan in progress") ||
              (emp?.scanInProgress && "Scan in progress") ||
              emp?.lastScannedOn ||
              "Scan to check"}
          </a>
        </div>
      </Col>
      <Col xs={2} sm={2} className=" d-flex gap-2 justify-content-center">
        <div className={styles.custom_box_contanner_row_data}>
          <Button
            disabled={emp?.scanInProgress || loading}
            onClick={() => handleScanEmployee(emp?._id)}
            style={{ backgroundColor: color1 }}
            className="border-0 text-dark"
          >
            {emp?.scanInProgress || loading ? (
              <Spinner size="sm" variant="success" />
            ) : (
              "Scan"
            )}
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default EmpRow;
