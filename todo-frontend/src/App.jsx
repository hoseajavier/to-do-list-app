import Home from "./pages/Home";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Home />
      <ToastContainer position="top-center" autoClose={2000} pauseOnHover={false} />
    </>
  );
}

export default App;
