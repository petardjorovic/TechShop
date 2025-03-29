import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { deleteUser } from "../../../services/adminService";
import { toast } from "react-toastify";

function DeleteUserModal({ setIsDeleteModal, currentUser, rerenderView }) {
  const dispatch = useDispatch();

  const deleteCurrentUser = async () => {
    setIsDeleteModal(false);
    dispatch(showLoader(true));
    const res = await deleteUser({
      userId: currentUser._id,
      userAvatar: currentUser.avatar,
    });
    dispatch(showLoader(false));
    if (res.status === "success") {
      if (typeof rerenderView === "function") rerenderView();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
      <div className="text-center">
        <h3>
          Are you sure that you want to delete user{" "}
          <span className="text-danger">{currentUser.username}</span> with email
          address <span className="text-primary">{currentUser.email}</span>?
        </h3>
      </div>
      <div className="btns-wrapper mt-4 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsDeleteModal(false)}
        >
          Cancel
        </button>
        <button className="btn btn-danger" onClick={deleteCurrentUser}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteUserModal;
