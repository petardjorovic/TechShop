import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import "./EditCategoryModal.scss";
import LabelComponent from "../../../components/Label/LabelComponent";
import InputComponent from "../../../components/Input/InputComponent";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import "./EditCategoryModal.scss";
import { editCategory } from "../../../services/adminService";
import { toast } from "react-toastify";

function EditCategoryModal({
  setIsEditCategoryModal,
  currentCategory,
  rerenderView,
}) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    !newCategoryName ? setIsCategoryEmpty(true) : setIsCategoryEmpty(false);
    if (!newCategoryName) return;
    setIsEditCategoryModal(false);
    dispatch(showLoader(true));
    const res = await editCategory({
      id: currentCategory._id,
      categoryName: newCategoryName,
    });
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
      <h4>Edit "{currentCategory.categoryName}" category</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"categoryName"} color={isCategoryEmpty}>
            {isCategoryEmpty ? "Category name is required" : "Category name"}
          </LabelComponent>
          <InputComponent
            type={"text"}
            id={"categoryName"}
            defaultValue={currentCategory.categoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>
        <div className="btns-wrapper">
          <button
            className="btn btn-primary"
            onClick={() => setIsEditCategoryModal(false)}
            type="button"
          >
            Close
          </button>
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditCategoryModal;
