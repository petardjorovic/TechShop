import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../store/currency/currencySlice";
import { toggleLoginForm } from "../../store/loginRegister/loginRegisterSlice";
import { localStorageConfig } from "../../config/LocalStorageConfig";
import { IoMdArrowDropdown } from "react-icons/io";
import { removeUser } from "../../store/user/userSlice";
import CartComponent from "../CartComponent/CartComponent";

function NavigationComponent() {
  const dispatch = useDispatch();
  const { currency, symbol } = useSelector((state) => state.currencyStore);
  const { isLoginForm } = useSelector((state) => state.loginRegisterStore);
  const { user } = useSelector((state) => state.userStore);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(localStorageConfig.CURRENCY, currency);
  }, [currency]);

  const changeCurrency = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  const toggleForm = () => {
    dispatch(toggleLoginForm(!isLoginForm));
  };

  const logoutUser = () => {
    localStorage.removeItem(localStorageConfig.USER);
    dispatch(removeUser());
    navigate("/authorization");
  };

  const navigationView = () => {
    return localStorage.getItem(localStorageConfig.USER) ? (
      <div className="dropdown">
        <li className="dropbtn">
          <a>
            {user.username} <IoMdArrowDropdown size={25} />
          </a>
        </li>
        <div className="dropdown-content">
          <li>
            <NavLink to={"/profile"}>Profile</NavLink>
          </li>
          {user.role === "admin" ? (
            <li>
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </li>
          ) : null}
          <li>
            <a onClick={logoutUser}>Logout</a>
          </li>
        </div>
      </div>
    ) : (
      <li>
        <NavLink to={"/authorization"} onClick={toggleForm}>
          {isLoginForm ? "Login" : "Register"}
        </NavLink>
      </li>
    );
  };

  return (
    <header>
      <div className="container">
        <div className="navigation-wrapper">
          <div className="currency">
            <label htmlFor="currency">Currency</label>
            <select
              name="currency"
              defaultValue={currency}
              id="currency"
              onChange={changeCurrency}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="RSD">RSD</option>
            </select>
          </div>
          <div className="navigation">
            <nav>
              <ul>
                <li>
                  <NavLink to={"/"}>Shop</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Contact</NavLink>
                </li>
                <li>
                  <CartComponent />
                </li>
                {navigationView()}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavigationComponent;
