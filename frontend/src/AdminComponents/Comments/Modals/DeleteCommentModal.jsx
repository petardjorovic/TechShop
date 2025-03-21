import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { deleteComment } from "../../../services/commentService";
import { toast } from "react-toastify";

function DeleteCommentModal({
  currentComment,
  setIsDeleteModal,
  rerenderView,
}) {
  const dispatch = useDispatch();

  const deleteCurrentComment = async () => {
    setIsDeleteModal(false);
    dispatch(showLoader(true));
    const res = await deleteComment(currentComment._id);
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
      <div className="text-center">
        <h3>
          Are you sure that you want to delete{" "}
          <span className="text-danger">{currentComment.author}</span>'s comment
          on <span className="text-primary">{currentComment.productTitle}</span>{" "}
          with content "{currentComment.content}" ?
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
        <button className="btn btn-danger" onClick={deleteCurrentComment}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteCommentModal;
