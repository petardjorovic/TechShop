import LabelComponent from "../../components/Label/LabelComponent";
import InputComponent from "../../components/Input/InputComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import "./AddProductComponent.scss";
import { useRef, useState } from "react";
import { addProduct } from "../../services/adminService";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import { toast } from "react-toastify";

function AddProductComponent() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
  const [isPriceEmpty, setIsPriceEmpty] = useState(false);
  const [isImageEmpty, setIsImageEmpty] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !product.title ? setIsTitleEmpty(true) : setIsTitleEmpty(false);
    !product.description
      ? setIsDescriptionEmpty(true)
      : setIsDescriptionEmpty(false);
    !product.price ? setIsPriceEmpty(true) : setIsPriceEmpty(false);
    !file ? setIsImageEmpty(true) : setIsImageEmpty(false);
    if (!product.title || !product.description || !product.price || !file)
      return;
    const newProduct = new FormData();
    newProduct.append("product", JSON.stringify(product));
    newProduct.append("file", file);
    dispatch(showLoader(true));
    const res = await addProduct(newProduct);
    dispatch(showLoader(false));
    if (res.status === "success") {
      toast.success(res.message);
      formRef.current.reset();
      setProduct({
        title: "",
        description: "",
        price: "",
      });
      setFile(null);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="add-product-wrapper">
      <div className="content">
        <h1>Add Product</h1>
      </div>
      <form className="add-product-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"title"} color={isTitleEmpty}>
            {isTitleEmpty ? "Title is required" : "Title"}
          </LabelComponent>
          <InputComponent
            type={"text"}
            id={"title"}
            placeholder={"Type product title"}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"description"} color={isDescriptionEmpty}>
            {isDescriptionEmpty ? "Description is required" : "Description"}
          </LabelComponent>
          <InputComponent
            type={"text"}
            id={"description"}
            placeholder={"Type product description"}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"price"} color={isPriceEmpty}>
            {isPriceEmpty ? "Price is required" : "Price"}
          </LabelComponent>
          <InputComponent
            type={"number"}
            id={"price"}
            placeholder={"Enter product price in EUROs"}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <LabelComponent htmlFor={"image"} color={isImageEmpty}>
            {isImageEmpty ? "Image is required" : "Image"}
          </LabelComponent>
          <InputComponent type={"file"} id={"image"} onChange={handleFile} />
        </div>
        <ButtonComponent className={"btn btn-primary"}>
          Add Product
        </ButtonComponent>
      </form>
    </div>
  );
}

export default AddProductComponent;
