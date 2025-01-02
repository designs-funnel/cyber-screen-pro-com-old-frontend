import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import "../styles/global.css";
import { AuthProvider } from "./AuthContext";
import NavbarComponent from "./component/navbar";
import React, { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const env = [process.env.NEXT_PUBLIC_BACKEND];
  const envIssue = env.some((v) => v === undefined);

  useEffect(() => {
    console.log("Developed with ❤️ by softmuneeb@gmail.com");
  }, []);

  return envIssue ? (
    <>Correct .env file</>
  ) : (
    <AuthProvider>
      <div>
        <ToastContainer />
        <NavbarComponent />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;

// export default function App({ Component, pageProps }) {
//   return <>
//   <Head>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" />
//   <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />

//   </Head>

//   <Component {...pageProps} />

//   <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></Script>
//   <Script src="https://unpkg.com/react/umd/react.development.js"></Script>
//   <Script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></Script>

// </>
// }
