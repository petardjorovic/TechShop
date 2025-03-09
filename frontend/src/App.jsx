import { Outlet, useLocation } from "react-router-dom";
import NavigationComponent from "./components/Navigation/NavigationComponent";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./config/AxiosConfig";
import { ToastContainer } from "react-toastify";
import LoaderComponent from "./components/Loader/LoaderComponent";
import { useDispatch, useSelector } from "react-redux";
import { localStorageConfig } from "./config/LocalStorageConfig";
import { setUser } from "./store/user/userSlice";
import { useEffect, useState } from "react";
import { showDashboard } from "./store/dashboard/dashboardSlice";

function App() {
  const { isDashboard } = useSelector((state) => state.dashboardStore);
  const location = useLocation();
  const dispatch = useDispatch();

  //* Postavljamo usera u redux ako je ulogovan a korisnik je reloadovao applikaciju
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(localStorageConfig.USER));
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  //* Togglujemo navigaciju u odnosu na to da li smo na Dashboardu
  useEffect(() => {
    if (location.pathname === "/dashboard") dispatch(showDashboard(true));
    else dispatch(showDashboard(false));
  }, [location]);
  return (
    <>
      <LoaderComponent />
      {!isDashboard && <NavigationComponent />}
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
