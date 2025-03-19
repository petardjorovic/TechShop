import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import { useDispatch } from "react-redux";
import { showLoader } from "../../../store/loader/loaderSlice";
import { toast } from "react-toastify";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import LabelComponent from "../../../components/Label/LabelComponent";
import InputComponent from "../../../components/Input/InputComponent";
import "./EditProductModal.scss";
import { useState } from "react";
import { editSingleProduct } from "../../../services/adminService";

function EditProductModal({ setIsEditModal, currentProduct, rerenderView }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    id: currentProduct?._id,
    title: currentProduct?.title,
    description: currentProduct?.description,
    price: currentProduct?.price,
    image: currentProduct?.image,
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: validacija inputa

    let formDataProduct;
    if (file) {
      formDataProduct = new FormData();
      formDataProduct.append("file", file);
      formDataProduct.append("product", JSON.stringify(product));
    }
    let hasFormData =
      formDataProduct &&
      formDataProduct.has("product") &&
      formDataProduct.has("file");
    dispatch(showLoader(true));
    const res = await editSingleProduct(
      hasFormData ? formDataProduct : product
    );
    dispatch(showLoader(false));
    if (res.status === "success") {
      toast.success(res.message);
      rerenderView();
      setIsEditModal(false);
    } else toast.error(res.message);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsEditModal(false);
  };

  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
      <div>
        <h3 className="text-center">Edit product: {currentProduct.title}</h3>
        <form className="edit-product-form py-1 px-5" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <LabelComponent htmlFor={"title"}>Title</LabelComponent>
            <InputComponent
              type={"text"}
              id={"title"}
              onChange={handleChange}
              defaultValue={currentProduct.title}
            />
          </div>
          <div className="input-wrapper">
            <LabelComponent htmlFor={"description"}>Description</LabelComponent>
            <InputComponent
              type={"text"}
              id={"description"}
              onChange={handleChange}
              defaultValue={currentProduct.description}
            />
          </div>
          <div className="input-wrapper">
            <LabelComponent htmlFor={"price"}>Price</LabelComponent>
            <InputComponent
              type={"number"}
              id={"price"}
              onChange={handleChange}
              defaultValue={currentProduct.price}
            />
          </div>
          <div className="input-wrapper">
            <LabelComponent htmlFor={"image"}>Image</LabelComponent>
            <InputComponent
              type={"file"}
              id={"image"}
              onChange={handleFile}
              className={"form-control"}
            />
          </div>
          <div className="btns-wrapper d-flex justify-content-between mt-4">
            <ButtonComponent
              className={"btn btn-primary"}
              onClick={closeModal}
              type={"button"}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent className={"btn btn-success"}>
              Edit
            </ButtonComponent>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditProductModal;
