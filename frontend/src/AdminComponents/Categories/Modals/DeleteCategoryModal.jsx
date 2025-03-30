import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import "./DeleteCategoryModal.scss";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { deleteCategory } from "../../../services/adminService";
import { toast } from "react-toastify";

function DeleteCategoryModal({
  setIsDeleteCategoryModal,
  currentCategory,
  rerenderView,
}) {
  const dispatch = useDispatch();
  const deleteCurrentCategory = async () => {
    setIsDeleteCategoryModal(false);
    dispatch(showLoader(true));
    const res = await deleteCategory(currentCategory._id);
    dispatch(showLoader(false));
    if (res.status === "success") {
      rerenderView();
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
  };
  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centere>
      <div className="text-center">
        <h3>
          Are you sure that you want to delete category{" "}
          <strong className="text-primary">
            {currentCategory.categoryName}
          </strong>
          ?
        </h3>
      </div>
      <div className="btns-wrapper mt-4 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsDeleteCategoryModal(false)}
        >
          Cancel
        </button>
        <button className="btn btn-danger" onClick={deleteCurrentCategory}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteCategoryModal;
