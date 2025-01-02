import axios from "axios";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import {
  FaCity,
  FaDownload,
  FaShareAlt,
  FaUserEdit,
  FaVoicemail,
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "../../styles/navbar.module.css";
import { token } from "../../utils/utils";
import ButtonList from "./buttonList";
import FilterList from "./filterList";
import TableContentTwo from "./tableContentTwo";
import { Spinner } from "react-bootstrap";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

function Dashboard() {
  const [activeTab, setActiveTab] = useState("#link1");

  const router = useRouter();

  const [employees, setEmployees] = useState();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, set_city] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [socialLinksButtonText, setSocialLinksButtonText] = useState();
  const [socialLinksLoaded, setSocialLinksLoaded] = useState();
  const [socialLinksLoadedIndex, setSocialLinksLoadedIndex] = useState();

  const validate = () => {
    let errors = {};
    if (!name?.trim()) {
      errors.name = "Name is required";
    }
    if (!email?.trim()) {
      errors.email = "Email is required";
    } else if (!EmailValidator.validate(email)) {
      errors.email = "Invalid email address";
    }
    if (!socialLinks.trim()) {
      errors.socialLinks = "Social links are required";
    } else {
      const links = socialLinks
        ?.split("\n")
        ?.map((link) => link?.trim()) // Trim each link
        ?.filter(Boolean); // Filter out empty strings

      const allowedPlatforms = ["x", "twitter", "instagram", "linkedin"];

      for (let link of links) {
        let url;
        try {
          url = new URL(link);
        } catch (error) {
          errors.socialLinks = "Invalid link found";
          break;
        }

        const hostname = url.hostname.replace("www.", "").toLowerCase();

        if (!allowedPlatforms.some((platform) => hostname.includes(platform))) {
          errors.socialLinks =
            "Twitter, Instagram, and Linkedin links are allowed";
          break;
        }

        const pathParts = url.pathname.split("/");
        if (pathParts.length < 2) {
          errors.socialLinks = "Invalid link format";
          break;
        }

        const username = pathParts[1];
        if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
          errors.socialLinks =
            "Invalid username format (only slugs are allowed)";
          break;
        }
      }
    }
    return errors;
  };

  const errorsText = () => Object.values(validate())?.[0];

  const extractLinks = (text) => {
    const regex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(regex);
    return matches || [];
  };

  const handleSubmit = async (e) => {
    if (errorsText()) return toast.warn(errorsText());

    try {
      await axios.post(
        `${BACKEND}/employee-create`,
        {
          name,
          email,
          socialLinks: extractLinks(socialLinks),
        },
        token(localStorage)
      );
      toast.success("Employee Added");
      setShow(false);
      getEmployees();

      setName();
      setEmail();
      set_city();
      setSocialLinks();
      setSocialLinksButtonText();
      setSocialLinksLoadedIndex();
      // router.reload();
    } catch (error) {
      toast.error(
        `${error?.response?.data?.message || error?.message || error}`
      );
    }
  };

  const handleGetLinks = async (e) => {
    if (!name) return toast.warn("Please add name");
    if (!city) return toast.warn("Please add city");

    if (socialLinksLoadedIndex !== undefined) {
      const linkIndex =
        (socialLinksLoadedIndex + 1) % socialLinksLoaded?.length;

      setSocialLinksLoadedIndex(linkIndex);

      const _socialLinks = socialLinks
        ? `${socialLinks}\n${socialLinksLoaded[linkIndex]}`
        : `${socialLinksLoaded[linkIndex]}`;

      setSocialLinks(_socialLinks);

      return;
    }

    try {
      const tid = toast.loading("Downloading Social Profile Handles");
      const text = `${name} ${city || ""} Instagram`;
      const res = await axios.post("/api/search_google", { text });
      const _socialLinks = socialLinks
        ? `${socialLinks}\n${res.data.profile_urls[0]}`
        : `${res.data.profile_urls[0]}`;

      setSocialLinks(_socialLinks);
      setSocialLinksLoadedIndex(0);
      setSocialLinksButtonText("Load Another Link");
      setSocialLinksLoaded(res.data.profile_urls);

      toast.done(tid);
      toast.success("Added Social Profile Handles");
    } catch (error) {
      toast.error(
        `Error: ${error?.message} ${JSON.stringify(
          error?.response?.data,
          0,
          2
        )}`
      );
    }
  };

  const getEmployees = async () => {
    const res = await axios.get(
      `${BACKEND}/employees-get`,
      token(localStorage)
    );
    setEmployees(res.data);
  };

  const getUser = async () => {
    const res = await axios.get(
      `${BACKEND}/user-get-info`,
      token(localStorage)
    );
    setUser(res.data);
  };

  const getData = async () => {
    try {
      await getUser();
      await getEmployees();
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Please login to continue");
        return router.push("/component/login");
      } else {
        toast.error(error?.response?.data?.message || error?.message);
      }
    }
  };

  useEffect(() => {
    getData();

    // TODO: can be improved to check if any employee who has max time after started and refresh if time passed is more than one minute
    // it will stop unnecessary refresh after every
    setInterval(() => {
      getEmployees();
    }, 60 * 1000);
  }, []);

  return (
    <>
      <Row className="py-lg-4 mt-3 mt-lg-0 p-3">
        <Col
          xs={4}
          sm={2}
          className=" d-flex justify-content-center align-items-center gap-2"
        >
          {user?.username ? (
            <h4
              // style={{ "white-space": "nowrap" }}
            >{`${user?.username} Employees`}</h4>
          ) : (
            <Spinner />
          )}

          {employees?.length > 0 && (
            <p className={styles.custom_Total_Employee}>
              {employees?.length || "..."}
            </p>
          )}
        </Col>
        <Col xs={8} sm={6}></Col>
        <Col xs={7} sm={2} className=" text-end">
          <FilterList user={user} />
        </Col>
        <Col xs={5} sm={2} className=" text-end">
          <ButtonList setShow={setShow} />
        </Col>
      </Row>

      <Tab.Container
        id="list-group-tabs-example bg-black"
        activeKey={activeTab}
        onSelect={setActiveTab}
      >
        <Row className={styles.custom_box_contanner_row}>
          <Col sm={12}>
            <Tab.Content>
              <Row
                className={`${styles.custom_box_contanner_row} g-2`}
                style={{ display: "flex" }}
              >
                <Col xs={2} sm={2} style={{ flex: "1" }}>
                  <div className={styles.custom_box_contanner_row_data}>
                    <p className="m-0 p-0 ">Name</p>
                  </div>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  style={{ flex: "1" }}
                  className={styles.custom_box_emp_email}
                >
                  <div className={styles.custom_box_contanner_row_data}>
                    <p className="m-0 p-0 ">Email</p>
                  </div>
                </Col>
                <Col xs={2} sm={2} style={{ flex: "1" }}>
                  <div className={styles.custom_box_contanner_row_data}>
                    <p className="m-0 p-0 ">Stats</p>
                  </div>
                </Col>
                <Col xs={2} sm={2} style={{ flex: "1" }}>
                  <div className={styles.custom_box_contanner_row_data}>
                    <p className="m-0 p-0 ">Total Posts</p>
                  </div>
                </Col>
                <Col xs={2} sm={2} style={{ flex: "1" }}>
                  <div className={styles.custom_box_contanner_row_data}>
                    <p className="m-0 p-0 ">Social</p>
                  </div>
                </Col>
                <Col xs={2} sm={2} style={{ flex: "1" }}>
                  <div className={styles.custom_box_contanner_row_data}>
                    <p className="m-0 p-0 ">Last Scan On</p>
                  </div>
                </Col>
                <Col xs={2} sm={2} style={{ flex: "1" }}>
                  <div className={styles.custom_box_contanner_row_data}>
                    <p className="m-0 p-0 ">Scan</p>
                  </div>
                </Col>
              </Row>
              <Tab.Pane eventKey="#link1">
                <TableContentTwo
                  setShow={setShow}
                  employees={employees}
                  setEmployees={setEmployees}
                  getEmployees={getEmployees}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <Modal show={show} centered onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className={styles.Modal_input_form}>
            <Form.Group controlId="username">
              <div className="input-group">
                <span className="input-group-text">
                  <FaUserEdit />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Form.Group>
            <br></br>
            <Form.Group controlId="email">
              <div className="input-group">
                <span className="input-group-text">
                  <FaVoicemail />
                </span>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Form.Group>
            <br></br>
            <Form.Group controlId="email">
              <div className="input-group">
                <span className="input-group-text">
                  <FaCity />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Enter City Name"
                  value={city}
                  onChange={(e) => set_city(e.target.value)}
                />
              </div>
            </Form.Group>
            <br></br>
            <Form.Group controlId="socialLinks">
              <div className="input-group">
                <span className="input-group-text">
                  <FaShareAlt />
                </span>
                <Form.Control
                  as="textarea"
                  rows={4}
                  type="text"
                  placeholder={
                    "(Optional) Enter social links, one in each line i.e\nhttps://twitter.com/elonmusk\nhttps://instagram.com/jayshetty\nhttps://linkedin.com/in/jayshetty"
                  }
                  value={socialLinks}
                  onChange={(e) => setSocialLinks(e.target.value)}
                />
              </div>
            </Form.Group>
            <br></br>
            <Button
              className={styles.Modal_fome_btn}
              variant="primary"
              onClick={handleGetLinks}
            >
              <FaDownload /> {socialLinksButtonText || "Get Social Links"}
            </Button>
            &nbsp; &nbsp;
            <Button
              className={styles.Modal_fome_btn}
              variant="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashboard;
