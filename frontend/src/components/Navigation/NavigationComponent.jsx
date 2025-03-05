import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../store/currency/currencySlice";
import { toggleLoginForm } from "../../store/loginRegister/loginRegisterSlice";
import { localStorageConfig } from "../../config/LocalStorageConfig";

function NavigationComponent() {
  const dispatch = useDispatch();
  const { currency, symbol } = useSelector((state) => state.currencyStore);
  const { isLoginForm } = useSelector((state) => state.loginRegisterStore);

  useEffect(() => {
    localStorage.setItem(localStorageConfig.CURRENCY, currency);
  }, [currency]);

  const changeCurrency = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  const toggleForm = () => {
    dispatch(toggleLoginForm(!isLoginForm));
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
            <span>{symbol}</span>
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
                  <NavLink to={"/authorization"} onClick={toggleForm}>
                    {isLoginForm ? "Login" : "Register"}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavigationComponent;
