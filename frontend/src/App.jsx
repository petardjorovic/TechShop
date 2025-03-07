import { Outlet } from "react-router-dom";
import NavigationComponent from "./components/Navigation/NavigationComponent";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./config/AxiosConfig";
import { ToastContainer } from "react-toastify";
import LoaderComponent from "./components/Loader/LoaderComponent";

function App() {
  return (
    <>
      <LoaderComponent />
      <NavigationComponent />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
