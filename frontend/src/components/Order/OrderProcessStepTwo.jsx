import React, { useState } from "react";
import LabelComponent from "../Label/LabelComponent";
import InputComponent from "../Input/InputComponent";
import "./OrderProcessStepTwo.scss";

function OrderProcessStepTwo() {
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
    county: "",
  });
  return (
    <div className="address-form-wrapper">
      <div className="content"></div>
      <form className="address-form">
        <div className="input-wrapper">
          <LabelComponent htmlFor={"fullName"}>Full Name</LabelComponent>
          <InputComponent
            type={"text"}
            id={"fullName"}
            placeholder={"Enter first and last name"}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"email"}>Email</LabelComponent>
          <InputComponent
            type={"text"}
            id={"email"}
            placeholder={"Enter email address"}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"address"}>Address</LabelComponent>
          <InputComponent
            type={"text"}
            id={"address"}
            placeholder={"Enter address"}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"phone"}>Phone</LabelComponent>
          <InputComponent
            type={"text"}
            id={"phone"}
            placeholder={"Enter phone number"}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"city"}>City</LabelComponent>
          <InputComponent
            type={"text"}
            id={"city"}
            placeholder={"Enter city"}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"postalCode"}>Postal Code</LabelComponent>
          <InputComponent
            type={"text"}
            id={"postalCode"}
            placeholder={"Enter postal code"}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"country"}>Country</LabelComponent>
          <InputComponent
            type={"text"}
            id={"country"}
            placeholder={"Enter country"}
          />
        </div>
        <button className="btn btn-info">Save</button>
      </form>
    </div>
  );
}

export default OrderProcessStepTwo;
