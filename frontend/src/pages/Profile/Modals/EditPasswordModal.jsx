import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import LabelComponent from "../../../components/Label/LabelComponent";
import InputComponent from "../../../components/Input/InputComponent";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import "./EditPasswordModall.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { changeUserPassword } from "../../../services/userService";
import { toast } from "react-toastify";

function EditPasswordModal({ setIsEditPasswordModal }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required!"),
      newPassword: Yup.string().required("New password is required!"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "New passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      setIsEditPasswordModal(false);
      dispatch(showLoader(true));
      const res = await changeUserPassword(values);
      dispatch(showLoader(false));
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
  });

  const showErrors = (inputName) =>
    formik.errors[inputName] &&
    formik.touched[inputName] &&
    formik.errors[inputName];

  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centere>
      <form className="edit-pass-form" onSubmit={formik.handleSubmit}>
        <div className="input-wrapper">
          <label
            htmlFor={"currentPassword"}
            className={showErrors("currentPassword") ? "text-danger" : ""}
          >
            {showErrors("currentPassword")
              ? showErrors("currentPassword")
              : "Current password"}
          </label>
          <InputComponent
            id={"currentPassword"}
            type={showCurrentPassword ? "text" : "password"}
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
          />
          <span
            className="eye"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <div className="input-wrapper">
          <label
            htmlFor={"newPassword"}
            className={showErrors("newPassword") ? "text-danger" : ""}
          >
            {showErrors("newPassword")
              ? showErrors("newPassword")
              : "New password"}
          </label>
          <InputComponent
            id={"newPassword"}
            type={showNewPassword ? "text" : "password"}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          <span
            className="eye"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <div className="input-wrapper">
          <label
            htmlFor={"confirmNewPassword"}
            className={showErrors("confirmNewPassword") ? "text-danger" : ""}
          >
            {showErrors("confirmNewPassword")
              ? showErrors("confirmNewPassword")
              : "Confirm new password"}
          </label>
          <InputComponent
            id={"confirmNewPassword"}
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
          />
          <span
            className="eye"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <div className="btns-wrapper d-flex justify-content-between mt-4">
          <ButtonComponent
            className={"btn btn-primary"}
            type={"button"}
            onClick={() => setIsEditPasswordModal(false)}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent className={"btn btn-success"} type={"submit"}>
            Edit
          </ButtonComponent>
        </div>
      </form>
    </Modal>
  );
}

export default EditPasswordModal;
