import AddUser from "./AddUser";
import "../src/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";
import { RouterContainer } from "./route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer autoClose={1000} theme="dark" position="top-right" />
      <RouterContainer />
    </>
  );
}

export default App;
