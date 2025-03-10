import { FaRegUserCircle } from "react-icons/fa";
import "./LoginForm.scss";
import LabelComponent from "../Label/LabelComponent";
import InputComponent from "../Input/InputComponent";
import ButtonComponent from "../Button/ButtonComponent";
import { useDispatch } from "react-redux";
import { showRegisterForm } from "../../store/loginRegister/loginRegisterSlice";
import { useEffect, useState } from "react";
import { checkEmailValidation } from "../../utils/checkEmailValidation";
import { login } from "../../services/userService";
import { showLoader } from "../../store/loader/loaderSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { localStorageConfig } from "../../config/LocalStorageConfig";
import { setUser } from "../../store/user/userSlice";

function LoginFormComponent() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !data.email ? setIsEmailEmpty(true) : setIsEmailEmpty(false);
    !data.password ? setIsPasswordEmpty(true) : setIsPasswordEmpty(false);
    checkEmailValidation(data.email)
      ? setInvalidEmail(false)
      : setInvalidEmail(true);
    if (!data.email || !data.password || !checkEmailValidation(data.email)) {
      return;
    }
    dispatch(showLoader(true));
    const res = await login(data);
    dispatch(showLoader(false));
    if (res.status === "success") {
      localStorage.setItem(localStorageConfig.USER, JSON.stringify(res.user));
      dispatch(setUser(res.user));
      navigate("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="content">
        <h3>We are glad to see you again!</h3>
        <p>
          If you still don't have an account{" "}
          <span onClick={() => dispatch(showRegisterForm())}>
            Go to Register <FaRegUserCircle />
          </span>
        </p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <LabelComponent
            htmlFor={"email"}
            color={isEmailEmpty || invalidEmail}
          >
            {isEmailEmpty
              ? "Email is required"
              : invalidEmail
              ? "Email is not valid"
              : "Email"}
          </LabelComponent>
          <InputComponent
            id={"email"}
            type={"text"}
            placeholder={"email@example.com"}
            onChange={handleChange}
            inputColor={isEmailEmpty || invalidEmail}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"password"} color={isPasswordEmpty}>
            {isPasswordEmpty ? "Password is required" : "Password"}
          </LabelComponent>
          <InputComponent
            id={"password"}
            type={showPassword ? "text" : "password"}
            placeholder={"Type your password"}
            onChange={handleChange}
            inputColor={isPasswordEmpty}
          />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <ButtonComponent className={"btn btn-success"}>Login</ButtonComponent>
      </form>
    </div>
  );
}

export default LoginFormComponent;
