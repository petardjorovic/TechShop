import React from "react";
import { useSelector } from "react-redux";
import RegisterFormComponent from "../../components/RegisterForm/RegisterFormCmponent";
import LoginFormComponent from "../../components/LoginForm/LoginFormComponent";

function AuthorizationPage() {
  const { isLoginForm } = useSelector((state) => state.loginRegisterStore);
  return (
    <>
      <div className="container">
        <div className="authorization-wrapper">
          {isLoginForm ? <RegisterFormComponent /> : <LoginFormComponent />}
        </div>
      </div>
    </>
  );
}

export default AuthorizationPage;
