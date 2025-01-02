import axios from "axios";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import styles from "../../styles/navbar.module.css";
import { token } from "../../utils/utils";
import { useRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import EmpRow from "./EmpRow";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

function TableContentTwo({ employees, setEmployees, setShow, getEmployees }) {
  const router = useRouter();

  const handleEditEmployee = (employeeId) => {
    setShow(true);
  };

  // TODO: Bilal
  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(
        `${BACKEND}/employee-delete/${employeeId}`,
        token(localStorage)
      );
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error.response?.data);
      toast.error("Error deleting employee");
    }
  };

  if (!employees) return <Spinner variant="success"> </Spinner>;
  else if (employees?.length === 0)
    return "You can add employees from the 'Add Employee' button.";
  else
    return (
      <Container
        style={{ backgroundColor: "#fffff" }}
        className={styles.custom_box_contanner}
      >
        {employees?.map((emp, id) => (
          <EmpRow emp={emp} key={id} getEmployees={getEmployees} />
        ))}
      </Container>
    );
}

export default TableContentTwo;
