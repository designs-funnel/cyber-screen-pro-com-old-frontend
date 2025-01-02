import React from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
function page404() {
  return (
    <Container>
      <div class="page-wrap d-flex flex-row align-items-center mt-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12 d-flex justify-content-center">
              <img
                src="\assests\Not-found.jpg"
                className="404"
                style={{ height: "340px", width: "auto" }}
              />
            </div>
            <div class="col-md-12 text-center">
              <div class="mb-2 lead">
                A página que você está buscando não foi encontrada.
              </div>

              <Link className="btn btn-link" href="/">
                back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default page404;
