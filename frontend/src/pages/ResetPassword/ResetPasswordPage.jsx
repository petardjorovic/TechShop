import "./ResetPasswordPage.scss";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { resetPassword } from "../../services/userService";
import { showLoader } from "../../store/loader/loaderSlice";
import { toast } from "react-toastify";

function ResetPasswordPage() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("New password is required!"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "New passwords must match!")
        .required("Confirm new password is required!"),
    }),
    onSubmit: async (values) => {
      dispatch(showLoader(true));
      const res = await resetPassword({ values, token });
      dispatch(showLoader(false));
      if (res.status === "success") {
        toast.success(res.message);
        setTimeout(() => {
          navigate("/authorization");
        }, 7000);
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
    <div className="container">
      <div className="reset-pass-wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="input-wrapper">
            <label
              htmlFor="newPassword"
              className={showErrors("newPassword") && "text-danger"}
            >
              {showErrors("newPassword")
                ? showErrors("newPassword")
                : "New Password"}
            </label>
            <input
              type="password"
              placeholder={"New Password"}
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label
              htmlFor="confirmNewPassword"
              className={showErrors("confirmNewPassword") && "text-danger"}
            >
              {showErrors("confirmNewPassword")
                ? showErrors("confirmNewPassword")
                : "Confirm New Password"}
            </label>
            <input
              type="password"
              placeholder={"Confirm New Password"}
              id="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
            />
          </div>
          <button className="btn btn-info" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
