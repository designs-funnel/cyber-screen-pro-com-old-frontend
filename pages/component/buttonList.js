import Button from "react-bootstrap/Button";
import { color1 } from "../../utils/utils";

function AddEmployee({ setShow }) {
  return (
    <>
      <Button
        onClick={() => setShow(true)}
        style={{ backgroundColor: color1 }}
        className="border-0 text-dark"
      >
        Add Employee
      </Button>
    </>
  );
}

export default AddEmployee;
