import "./RegisterForm.scss";
import LabelComponent from "../Label/LabelComponent";
import InputComponent from "../Input/InputComponent";
import ButtonComponent from "../Button/ButtonComponent";
import { useState } from "react";
import { checkEmailValidation } from "../../utils/checkEmailValidation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { register } from "../../services/userService";
import { toast } from "react-toastify";

function RegisterFormCmponent() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    !data.email ? setIsEmailEmpty(true) : setIsEmailEmpty(false);
    !data.password ? setIsPasswordEmpty(true) : setIsPasswordEmpty(false);
    checkEmailValidation(data.email)
      ? setIsEmailValid(false)
      : setIsEmailValid(true);
    if (!data.email || !data.password || !checkEmailValidation(data.email))
      return;
    const res = await register(data);
    if (res && res.status === "success") {
      toast.success(res.message);
    } else if (res && (res.status === "error" || res.status === "fail")) {
      toast.error(res.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-wrapper">
          <LabelComponent
            htmlFor={"email"}
            labelColor={isEmailEmpty || isEmailValid}
          >
            {isEmailEmpty
              ? "Email is required"
              : isEmailValid
              ? "Email is not valid"
              : "Email"}
          </LabelComponent>
          <InputComponent
            id={"email"}
            placeholder={"example@mail.com"}
            type={"text"}
            onChange={handleChange}
            inputColor={isEmailEmpty || isEmailValid}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"password"} labelColor={isPasswordEmpty}>
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
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <ButtonComponent>Register</ButtonComponent>
      </form>
    </>
  );
}

export default RegisterFormCmponent;
