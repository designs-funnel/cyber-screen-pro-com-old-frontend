import React from "react";
import { color3 } from "../../utils/utils";

function LoaderComponent() {
  return (
    <div>
      <style>
        {`
            .loader3 {
               width: 500px;
               height: 500px;
               display: inline-block;
               padding: 0px;
               text-align: left;
            }
            .loader3 span {
               position: absolute;
               display: inline-block;
               width: 500px;
               height: 500px;
               border-radius: 100%;
               background: ${color3};
               -webkit-animation: loader3 1.5s linear infinite;
               animation: loader3 1.5s linear infinite;
            }
            .loader3 span:last-child {
               animation-delay: -0.9s;
               -webkit-animation-delay: -0.9s;
            }
            @keyframes loader3 {
               0% { transform: scale(0, 0); opacity: 0.8; }
               100% { transform: scale(1, 1); opacity: 0; }
            }
            @-webkit-keyframes loader3 {
               0% { -webkit-transform: scale(0, 0); opacity: 0.8; }
               100% { -webkit-transform: scale(1, 1); opacity: 0; }
            }
            `}
      </style>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <div className="loader3">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoaderComponent;
