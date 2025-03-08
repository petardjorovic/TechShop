import "./RegisterForm.scss";
import LabelComponent from "../Label/LabelComponent";
import InputComponent from "../Input/InputComponent";
import ButtonComponent from "../Button/ButtonComponent";
import { useState } from "react";
import { checkEmailValidation } from "../../utils/checkEmailValidation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { register } from "../../services/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import { showLoginForm } from "../../store/loginRegister/loginRegisterSlice";
import { MdLogin } from "react-icons/md";

function RegisterFormCmponent() {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !data.email ? setIsEmailEmpty(true) : setIsEmailEmpty(false);
    !data.username ? setIsUsernameEmpty(true) : setIsUsernameEmpty(false);
    !data.password ? setIsPasswordEmpty(true) : setIsPasswordEmpty(false);
    checkEmailValidation(data.email)
      ? setIsEmailValid(false)
      : setIsEmailValid(true);
    if (
      !data.email ||
      !data.username ||
      !data.password ||
      !checkEmailValidation(data.email)
    )
      return;

    dispatch(showLoader(true));
    const res = await register(data);
    dispatch(showLoader(false));
    if (res.status === "success") {
      toast.success(res.message);
      dispatch(showLoginForm());
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className="register-form-wrapper">
        <div className="content">
          <h3>Welcome to WebShop Register Page</h3>
          <p>
            If you already have an account{" "}
            <span onClick={() => dispatch(showLoginForm())}>
              Go to Login <MdLogin size={20} />
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-wrapper">
            <LabelComponent
              htmlFor={"email"}
              color={isEmailEmpty || isEmailValid}
            >
              {isEmailEmpty
                ? "Email is required"
                : isEmailValid
                ? "Email is not valid"
                : "Email"}
            </LabelComponent>
            <InputComponent
              id={"email"}
              placeholder={"email@example.com"}
              type={"text"}
              onChange={handleChange}
              inputColor={isEmailEmpty || isEmailValid}
            />
          </div>
          <div className="input-wrapper">
            <LabelComponent htmlFor={"username"} color={isUsernameEmpty}>
              {isUsernameEmpty ? "Username is required" : "Username"}
            </LabelComponent>
            <InputComponent
              type={"text"}
              id={"username"}
              placeholder={"Enter username"}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <LabelComponent htmlFor={"password"} color={isPasswordEmpty}>
              {isPasswordEmpty ? "Password is required" : "Password"}
            </LabelComponent>
            <InputComponent
              id={"password"}
              placeholder={"Enter password"}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              showPassword={showPassword}
              inputColor={isPasswordEmpty}
            />
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          <ButtonComponent className={"btn btn-primary"}>
            Register
          </ButtonComponent>
        </form>
      </div>
    </>
  );
}

export default RegisterFormCmponent;
