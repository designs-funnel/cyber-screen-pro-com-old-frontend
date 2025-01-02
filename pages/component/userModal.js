import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { PieChart } from "react-minimal-pie-chart";
import Row from "react-bootstrap/Row";

function UserModal(props) {
  const data = [
    { title: "Positive", value: 30, color: "#D2222D" },
    { title: "Neutral", value: 20, color: "#FFBF00" },
    { title: "Negative", value: 15, color: "#238823" },
  ];
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={6} md={8}>
              <div style={{ width: "80%", height: "80%" }}>
                <PieChart
                  data={data}
                  label={({ dataEntry }) => {
                    const percentage = Math.round(
                      (dataEntry.value / totalValue) * 100
                    );
                    const abbreviation = dataEntry.title.substring(0, 4); // Get the first 3 characters as abbreviation
                    return `${abbreviation}${percentage}%`;
                  }}
                  labelStyle={() => ({
                    fill: "black",
                    fontSize: "7px",
                    fontFamily: "Arial, sans-serif",
                    width: "20px",
                  })}
                />
              </div>
            </Col>
            <Col xs={6} md={4}>
              <h5>username</h5>
              <h5>username</h5>
              <h5>username</h5>
              <h5>username</h5>
            </Col>
          </Row>
          <Row className="pt-3">
            <Col xs={6} md={8}>
              <h5>username</h5>
              <h5>username</h5>
              <h5>username</h5>
              <h5>username</h5>
            </Col>
            <Col xs={3} md={2}>
              <li>
                <img
                  src="\assests\graph-icon.webp"
                  style={{ height: "20px", width: "20px" }}
                />{" "}
              </li>
              <li>
                <img
                  src="\assests\graph-icon.webp"
                  style={{ height: "20px", width: "20px" }}
                />
              </li>
              <li>
                <img
                  src="\assests\graph-icon.webp"
                  style={{ height: "20px", width: "20px" }}
                />
              </li>
              <li>
                <img
                  src="\assests\graph-icon.webp"
                  style={{ height: "20px", width: "20px" }}
                />
              </li>
            </Col>
            <Col xs={3} md={2}>
              <li>
                <img
                  src="\assests\graph-icon.webp"
                  style={{ height: "20px", width: "20px" }}
                />
              </li>
              <li>
                <img
                  src="\assests\graph-icon.webp"
                  style={{ height: "20px", width: "20px" }}
                />
              </li>
              <li>
                <img
                  src="\assests\graph-icon.webp"
                  style={{ height: "20px", width: "20px" }}
                />
              </li>
              <li>
                <img
                  src="\assests\graph-icon.webp"
                  style={{ height: "20px", width: "20px" }}
                />
              </li>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button> Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default UserModal;
