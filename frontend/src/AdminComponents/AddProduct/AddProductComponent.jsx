import LabelComponent from "../../components/Label/LabelComponent";
import InputComponent from "../../components/Input/InputComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import "./AddProductComponent.scss";
import { useEffect, useRef, useState } from "react";
import { addProduct } from "../../services/adminService";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import { toast } from "react-toastify";
import { getAllCategories } from "../../services/categoryServices";

function AddProductComponent() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
  const [isPriceEmpty, setIsPriceEmpty] = useState(false);
  const [isPriceNegative, setIsPriceNegative] = useState(false);
  const [isImageEmpty, setIsImageEmpty] = useState(false);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(showLoader(true));
      const res = await getAllCategories();
      dispatch(showLoader(false));
      if (res.status === "success") {
        setCategories(res.allCategories);
      }
    };
    fetchCategories();
  }, []);

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
    !product.categoryId ? setIsCategoryEmpty(true) : setIsCategoryEmpty(false);
    !product.price ? setIsPriceEmpty(true) : setIsPriceEmpty(false);
    Number(product.price) < 0
      ? setIsPriceNegative(true)
      : setIsPriceNegative(false);
    !file ? setIsImageEmpty(true) : setIsImageEmpty(false);
    if (
      !product.title ||
      Number(product.price) < 0 ||
      !product.description ||
      !product.price ||
      !product.categoryId ||
      !file
    ) {
      return;
    }
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
        categoryId: "",
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
          <LabelComponent htmlFor={"category"} color={isCategoryEmpty}>
            {isCategoryEmpty ? "Category is required" : "Category"}
          </LabelComponent>
          <select
            id="categoryId"
            value={product.categoryId}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Choose category
            </option>
            {categories.length > 0
              ? categories.map((category, index) => {
                  return (
                    <option value={category._id} key={index}>
                      {category.categoryName}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <div className="input-wrapper">
          <LabelComponent
            htmlFor={"price"}
            color={isPriceEmpty || isPriceNegative}
          >
            {isPriceEmpty
              ? "Price is required"
              : isPriceNegative
              ? "Price must be positive value"
              : "Price"}
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
          <InputComponent
            type={"file"}
            id={"image"}
            onChange={handleFile}
            className={"input-image"}
          />
        </div>
        <ButtonComponent className={"btn btn-primary"}>
          Add Product
        </ButtonComponent>
      </form>
    </div>
  );
}

export default AddProductComponent;
