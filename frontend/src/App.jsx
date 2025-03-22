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
import { setCart } from "./store/cart/cartSlice";
import "./App.scss";

function App() {
  const { isDashboard } = useSelector((state) => state.dashboardStore);
  const { cart } = useSelector((state) => state.cartStore);
  const location = useLocation();
  const dispatch = useDispatch();

  //* Postavljamo usera u redux ako je ulogovan a korisnik je reloadovao applikaciju i cart ako nije bila prazna pre reloada
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(localStorageConfig.USER));
    if (user) dispatch(setUser(user));
    const cart = JSON.parse(localStorage.getItem(localStorageConfig.CART));
    if (cart) dispatch(setCart(cart));
  }, []);

  //* Togglujemo navigaciju u odnosu na to da li smo na Dashboardu
  // useEffect(() => {
  //   if (location.pathname === "/dashboard") dispatch(showDashboard(true));
  //   else dispatch(showDashboard(false));
  // }, [location]);

  useEffect(() => {
    if (cart.length)
      localStorage.setItem(localStorageConfig.CART, JSON.stringify(cart));
  }, [cart]);
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
