import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import LabelComponent from "../../../components/Label/LabelComponent";
import InputComponent from "../../../components/Input/InputComponent";
import "./EditProfileModal.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { editUserProfile, getSingleUser } from "../../../services/userService";
import { toast } from "react-toastify";
import { useEffect } from "react";

function EditProfileModal({ user, rerenderView, setIsEditModal }) {
  const [data, setData] = useState({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    gender: user?.gender,
    address: user?.address,
    city: user?.city,
    phoneNumber: user?.phoneNumber,
    postCode: user?.postCode,
  });
  const [file, setFile] = useState(null);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.username) setIsUsernameEmpty(true);
    if (!data.username) return;
    setIsEditModal(false);
    let userFormData;
    if (file) {
      userFormData = new FormData();
      userFormData.append("file", file);
      userFormData.append("data", JSON.stringify(data));
    }

    let hasFormData =
      userFormData && userFormData.has("file") && userFormData.has("data");
    dispatch(showLoader(true));
    const res = await editUserProfile(hasFormData ? userFormData : data);
    dispatch(showLoader(false));
    if (res.status === "success") {
      rerenderView();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
      <div>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="top-content">
            <div className="left">
              <div className="input-wrapper">
                <LabelComponent htmlFor={"username"} color={isUsernameEmpty}>
                  {isUsernameEmpty ? "Username is required" : "Username"}
                </LabelComponent>
                <InputComponent
                  id={"username"}
                  type={"text"}
                  defaultValue={data.username}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <LabelComponent htmlFor={"firstName"}>
                  First Name
                </LabelComponent>
                <InputComponent
                  id={"firstName"}
                  type={"text"}
                  defaultValue={data.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <LabelComponent htmlFor={"lastName"}>Last Name</LabelComponent>
                <InputComponent
                  id={"lastName"}
                  type={"text"}
                  defaultValue={data.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <LabelComponent htmlFor={"address"}>Address</LabelComponent>
                <InputComponent
                  id={"address"}
                  type={"text"}
                  defaultValue={data.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="right">
              <div className="input-wrapper">
                <LabelComponent htmlFor={"city"}>City</LabelComponent>
                <InputComponent
                  id={"city"}
                  type={"text"}
                  defaultValue={data.city}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <LabelComponent htmlFor={"phoneNumber"}>
                  Phone number
                </LabelComponent>
                <InputComponent
                  id={"phoneNumber"}
                  type={"text"}
                  defaultValue={data.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <LabelComponent htmlFor={"postCode"}>Post code</LabelComponent>
                <InputComponent
                  id={"postCode"}
                  type={"text"}
                  defaultValue={data.postCode}
                  onChange={handleChange}
                />
              </div>
              <div className="input-gender">
                <LabelComponent htmlFor={"gender"}>Gender:</LabelComponent>
                <select
                  name="gender"
                  id="gender"
                  defaultValue={data.gender}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="input-wrapper-img">
                <LabelComponent htmlFor={"avatar"}>Upload image</LabelComponent>
                <InputComponent
                  id={"avatar"}
                  type={"file"}
                  onChange={handleFile}
                />
              </div>
            </div>
          </div>

          <div className="btns-wrapper d-flex justify-content-between mt-4">
            <ButtonComponent
              className={"btn btn-primary"}
              onClick={() => setIsEditModal(false)}
              type={"button"}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent className={"btn btn-success"} type={"submit"}>
              Edit
            </ButtonComponent>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
