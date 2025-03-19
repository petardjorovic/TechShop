import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { deleteProduct } from "../../../services/adminService";
import { toast } from "react-toastify";

function DeleteProductModal({ setIsOpen, currentProduct, rerenderView }) {
  const dispatch = useDispatch();
  const deleteCurrentProduct = async () => {
    setIsOpen(false);
    dispatch(showLoader(true));
    const res = await deleteProduct({
      productId: currentProduct._id,
      productImage: currentProduct.image,
    });
    dispatch(showLoader(false));
    if (res.status === "success") {
      toast.success(res.message);
      if (typeof rerenderView === "function") rerenderView();
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
      <div className="text-center">
        <h3>
          Are you sure that you want to delete{" "}
          <span className="text-danger">{currentProduct.title}</span>?
        </h3>
      </div>
      <div className="btns-wrapper mt-4 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button className="btn btn-danger" onClick={deleteCurrentProduct}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteProductModal;
