import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { color1, buttonColor, color3 } from "../../utils/utils";
import { useAuth } from "../AuthContext";
function NavbarComponent() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("token") !== null;
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
    router.push("/component/login"); // Redirect to login page
  };

  return (
    <>
      <Navbar style={{ backgroundColor: buttonColor, color: "black" }}>
        <Container>
          <Navbar.Brand
            href="#home"
            className="d-flex align-items-center"
            onClick={() => router.push("/")}
          >
            <img
              src="/assests/logos.svg" // Update path to logo
              className="Navbar-logo"
              style={{ height: "50px", width: "100%" }}
              alt="Logo"
            />
            {/* <p className="m-0 ms-2">CyberScreenPro</p> */}
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <Navbar.Text>
                <Button
                  style={{ backgroundColor: color1 }}
                  className="border-0 text-dark"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Navbar.Text>
            ) : null}
            {!isLoggedIn && (
              <>
                <Navbar.Text className="me-3">
                  <Link href="/component/register">
                    <Button
                      style={{ backgroundColor: color1 }}
                      className="border-0 text-dark"
                    >
                      Register
                    </Button>
                  </Link>
                </Navbar.Text>
                <Navbar.Text>
                  <Link href="/component/login">
                    <Button
                      style={{ backgroundColor: color1 }}
                      className="border-0 text-dark"
                    >
                      Login
                    </Button>
                  </Link>
                </Navbar.Text>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
