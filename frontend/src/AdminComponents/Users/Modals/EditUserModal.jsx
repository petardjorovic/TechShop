import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import "./EditUserModal.scss";
import LabelComponent from "../../../components/Label/LabelComponent";
import InputComponent from "../../../components/Input/InputComponent";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { showLoader } from "../../../store/loader/loaderSlice";
import { editUser } from "../../../services/adminService";
import { toast } from "react-toastify";

function EditUserModal({ setIsEditModal, currentUser, rerenderView }) {
  const [data, setData] = useState({
    username: currentUser?.username,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    address: currentUser?.address,
    city: currentUser?.city,
    phoneNumber: currentUser?.phoneNumber,
    postCode: currentUser?.postCode,
    gender: currentUser?.gender,
    status: currentUser?.status,
    role: currentUser?.role,
  });
  const dispatch = useDispatch();
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    !data.username ? setIsUsernameEmpty(true) : setIsUsernameEmpty(false);
    if (!data.username) return;
    let isChanged = false;
    for (let key in data) {
      if (data[key] !== currentUser[key]) {
        isChanged = true;
      }
    }
    if (!isChanged) return;
    setIsEditModal(false);
    dispatch(showLoader(true));
    const res = await editUser({ ...data, email: currentUser.email });
    dispatch(showLoader(false));
    if (res.status === "success") {
      rerenderView();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "status") {
      let stat;
      if (value === "true") {
        stat = true;
      } else if (value === "false") {
        stat = false;
      } else {
        stat = data.status;
      }
      setData({ ...data, status: stat });
    } else {
      setData({ ...data, [id]: value });
    }
  };

  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
      <div>
        <form className="edit-user-form" onSubmit={handleSubmit}>
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
                  <option value={currentUser.gender}>
                    {currentUser.gender}
                  </option>
                  {!currentUser.gender && (
                    <>
                      <option value={"male"}>male</option>
                      <option value={"female"}>female</option>
                    </>
                  )}
                  {currentUser.gender === "male" && (
                    <>
                      <option value={"female"}>female</option>
                    </>
                  )}
                  {currentUser.gender === "female" && (
                    <>
                      <option value={"male"}>male</option>
                    </>
                  )}
                </select>
              </div>
              <div className="input-status">
                <LabelComponent htmlFor={"status"}>
                  Activation status:
                </LabelComponent>
                <select
                  name="status"
                  id="status"
                  defaultValue={data.status}
                  onChange={handleChange}
                >
                  {currentUser.status ? (
                    <>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </>
                  ) : (
                    <>
                      <option value={false}>Inactive</option>
                      <option value={true}>Active</option>
                    </>
                  )}
                </select>
              </div>
              <div className="input-role">
                <LabelComponent htmlFor={"role"}>Role:</LabelComponent>
                <select
                  name="role"
                  id="role"
                  onChange={handleChange}
                  defaultValue={data.role}
                >
                  <option value={currentUser.role}>{currentUser.role}</option>
                  {currentUser.role === "admin" ? (
                    <option value={"user"}>user</option>
                  ) : (
                    <option value={"admin"}>admin</option>
                  )}
                </select>
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
              Save
            </ButtonComponent>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditUserModal;
