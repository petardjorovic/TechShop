import { useEffect, useState } from "react";
import "./CategoryComponent.scss";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import AddCategoryModal from "./Modals/AddCategoryModal";
import { getAllCategories } from "../../services/categoryServices";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function CategoryComponent() {
  const [categories, setCategories] = useState([]);
  const [isAddCategoryModal, setIsCategoryModal] = useState(false);
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    dispatch(showLoader(true));
    const res = await getAllCategories();
    dispatch(showLoader(false));
    if (res.status === "success") {
      setCategories(res.allCategories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-wrapper">
      <div className="category-header">
        <h1>Categories</h1>
        <button onClick={() => setIsCategoryModal(true)}>
          Add New Category
        </button>
      </div>
      <div className="category-table">
        <table className="table table-bordered table-striped table-dark">
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
              <th>Lower name</th>
              <th>Product Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0
              ? categories.map((category, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{category.categoryName}</td>
                      <td>{category.categoryName.toLowerCase()}</td>
                      <td>
                        <p>{category.products.length}</p>{" "}
                        {category.products.length > 0 ? (
                          <span className="has-product bg-info">
                            <FaRegEye color="black" />
                          </span>
                        ) : (
                          <span className="hasnt-product bg-danger">
                            <FaRegEyeSlash />
                          </span>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-warning me-2 align-self-start">
                          Edit
                        </button>
                        <button className="btn btn-danger ms-2">Delete</button>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
      {isAddCategoryModal && (
        <AddCategoryModal
          setIsCategoryModal={setIsCategoryModal}
          rerenderView={fetchCategories}
        />
      )}
    </div>
  );
}

export default CategoryComponent;
