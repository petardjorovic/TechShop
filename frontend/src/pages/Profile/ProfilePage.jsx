import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import { urlConfig } from "../../config/urlConfig";
import "./ProfilePage.scss";
import EditProfileModal from "./Modals/EditProfileModal";
import { getSingleUser } from "../../services/userService";
import EditPasswordModal from "./Modals/EditPasswordModal";

function ProfilePage() {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isEditPasswordModal, setIsEditPasswordModal] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const fetchUser = async () => {
    dispatch(showLoader(true));
    const res = await getSingleUser();
    dispatch(showLoader(false));
    if (res.status === "success") {
      setUser(res.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const openEditModal = () => {
    setIsEditModal(true);
  };
  return (
    <div className="container">
      {user.hasOwnProperty("username") && (
        <div className="profile-wrapper">
          <img
            src={`${urlConfig.backend}/uploads/users/${user.avatar}`}
            alt={user?.avatar}
          />
          <div className="content">
            <div className="left">
              <p>
                <strong>Username: </strong> <span>{user.username}</span>
              </p>
              <p>
                <strong>Email: </strong> <span>{user.email}</span>
              </p>
              <p>
                <strong>First Name: </strong> <span>{user?.firstName}</span>
              </p>
              <p>
                <strong>Last Name: </strong> <span>{user?.lastName}</span>
              </p>
              <p>
                <strong>Gender: </strong> <span>{user?.gender}</span>
              </p>
            </div>
            <div className="right">
              <p>
                <strong>Password: </strong>
                {"  "}
                <span>
                  <button
                    className="btn btn-success"
                    onClick={() => setIsEditPasswordModal(true)}
                  >
                    Change
                  </button>
                </span>
              </p>
              <p>
                <strong>City: </strong> <span>{user?.city}</span>
              </p>
              <p>
                <strong>Address: </strong> <span>{user?.address}</span>
              </p>
              <p>
                <strong>Post Code: </strong> <span>{user?.postCode}</span>
              </p>
              <p>
                <strong>Phone Number: </strong> <span>{user?.phoneNumber}</span>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="btns-wrap">
        <button
          className="btn btn-primary form-control"
          onClick={() => openEditModal()}
        >
          Edit profile
        </button>
      </div>
      {isEditPasswordModal && (
        <EditPasswordModal setIsEditPasswordModal={setIsEditPasswordModal} />
      )}
      {isEditModal && user.hasOwnProperty("username") && (
        <EditProfileModal
          user={user}
          setIsEditModal={setIsEditModal}
          rerenderView={fetchUser}
        />
      )}
    </div>
  );
}

export default ProfilePage;
