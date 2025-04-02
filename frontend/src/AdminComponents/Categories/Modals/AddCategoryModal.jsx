import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import LabelComponent from "../../../components/Label/LabelComponent";
import InputComponent from "../../../components/Input/InputComponent";
import "./AddCategoryModal.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { addCategory } from "../../../services/adminService";
import { toast } from "react-toastify";

function AddCategoryModal({ setIsCategoryModal, rerenderView, categories }) {
  const [categoryName, setCategoryName] = useState("");
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
  const [existsCategory, setExistsCategory] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    !categoryName ? setIsCategoryEmpty(true) : setIsCategoryEmpty(false);
    if (!categoryName) return;
    let isMatch = false;
    for (let i = 0; i < categories.length; i++) {
      if (
        categories[i].categoryName.toLowerCase() === categoryName.toLowerCase()
      ) {
        setExistsCategory(true);
        isMatch = true;
      }
    }
    if (isMatch) return;
    setIsCategoryModal(false);
    dispatch(showLoader(true));
    const res = await addCategory(categoryName);
    dispatch(showLoader(false));
    if (res.status === "success") {
      rerenderView();
      toast.success(res.message);
    } else toast.error(res.message);
  };

  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
      <form className="add-category-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <LabelComponent
            htmlFor={"categoryName"}
            color={isCategoryEmpty || existsCategory}
          >
            {isCategoryEmpty
              ? "Category Name is required!"
              : existsCategory
              ? "Category Name exists"
              : "Category Name"}
          </LabelComponent>
          <InputComponent
            id={"categoryName"}
            type={"text"}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="btns-wrapper">
          <button
            className="btn btn-primary"
            onClick={() => setIsCategoryModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-success">Save</button>
        </div>
      </form>
    </Modal>
  );
}

export default AddCategoryModal;
