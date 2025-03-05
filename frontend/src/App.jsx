import { Outlet } from "react-router-dom";
import NavigationComponent from "./components/Navigation/NavigationComponent";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavigationComponent />
      <Outlet />
    </>
  );
}

export default App;
