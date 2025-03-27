import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import "./ForgotPasswordModal.scss";
import { useState } from "react";
import { checkEmailValidation } from "../../../utils/checkEmailValidation";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { forgotPassword } from "../../../services/userService";
import { toast } from "react-toastify";

function ForgotPasswordModal({ setIsForgotPassModal }) {
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !email ? setIsEmailEmpty(true) : setIsEmailEmpty(false);
    checkEmailValidation(email)
      ? setInvalidEmail(false)
      : setInvalidEmail(true);
    if (!email || !checkEmailValidation(email)) return;
    setIsForgotPassModal(false);
    dispatch(showLoader(true));
    const res = await forgotPassword(email);
    dispatch(showLoader(false));
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
      <form className="forgot-pass-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label
            htmlFor="email"
            className={isEmailEmpty || invalidEmail ? "text-danger" : ""}
          >
            {isEmailEmpty
              ? "Email is required"
              : invalidEmail
              ? "Email is not valid"
              : "Email"}
          </label>
          <input type="text" id="email" value={email} onChange={handleChange} />
        </div>
        <div className="btns-wrapper">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setIsForgotPassModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-success">Send Link</button>
        </div>
      </form>
    </Modal>
  );
}

export default ForgotPasswordModal;
