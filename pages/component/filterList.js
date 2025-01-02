import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/navbar.module.css";
import { color1, token } from "../../utils/utils";
import { toast } from "react-toastify";
import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

function FilterList({ user }) {
  const [show, setShow] = useState(false);

  const [positive_keywords, set_positive_keywords] = useState();
  const [negative_keywords, set_negative_keywords] = useState();

  useEffect(() => {
    user?.positive_keywords?.length > 0 &&
      set_positive_keywords(user?.positive_keywords?.join(", "));

    user?.negative_keywords?.length > 0 &&
      set_negative_keywords(user?.negative_keywords?.join(", "));
  }, [user]);

  const onSaveKeywordFilters = async () => {
    try {
      await axios.post(
        `${BACKEND}/save-keywords-filter`,
        {
          positive_keywords: positive_keywords
            ?.split(",")
            ?.map((w) => w?.trim()),
          negative_keywords: negative_keywords
            ?.split(",")
            ?.map((w) => w?.trim()),
        },
        token(localStorage)
      );
      toast.success("Filters Updated");
    } catch (error) {
      console.log(error?.message, error?.response?.data);
      toast.error(`Error : ${error?.response?.data}`);
    } finally {
      setShow(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        style={{ backgroundColor: color1 }}
        className="border-0 text-dark"
      >
        Keyword Based Filters
      </Button>

      <Modal show={show} centered onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title> Keyword Filter Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className={styles.Modal_input_form}>
            <label htmlFor="Positive" className="form-label d-flex p-2">
              Positive Keywords (Separated by commas)
            </label>
            <Form.Group controlId="formUsername">
              <div className="input-group">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Flower, Love, Romantic, Like"
                  disabled={!user}
                  value={positive_keywords}
                  onChange={(e) => set_positive_keywords(e.target.value)}
                />
              </div>
            </Form.Group>
            <label htmlFor="Negative" className="form-label d-flex p-2">
              Negative Keywords (Separated by commas)
            </label>
            <Form.Group controlId="formUsername">
              <div className="input-group">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Gun, Kill, Breakup, Dislike"
                  value={negative_keywords}
                  onChange={(e) => set_negative_keywords(e.target.value)}
                />
              </div>
            </Form.Group>

            <Button
              className={styles.Modal_filter_btn}
              border-0
              m-2
              onClick={onSaveKeywordFilters}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default FilterList;
