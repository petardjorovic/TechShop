import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productServices";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import "./ProductsComponent.scss";
import DeleteProductModal from "./Modals/DeleteProductModal";
import EditProductModal from "./Modals/EditProductModal";
import { urlConfig } from "../../config/urlConfig";

function ProductsComponent() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const dispatch = useDispatch();
  const [isEditModal, setIsEditModal] = useState(false);

  const fetchProducts = async () => {
    dispatch(showLoader(true));
    const res = await getAllProducts();
    dispatch(showLoader(false));
    if (res.status === "success") setProducts(res.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const displayAllProducts = () => {
    return products.map((product, index) => {
      return (
        <tr key={index} className="align-middle">
          <td>{index + 1}</td>
          <td>
            <img
              src={`${urlConfig.backend}/uploads/${product.image}`}
              alt={product.title}
            />
          </td>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td>Category</td>
          <td>{product.rating.toFixed(1)}</td>
          <td>
            <div className="btns-wrapper">
              <button
                className="btn btn-warning"
                onClick={() => openEditProductModal(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => openDeleteProductModal(product)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  const openDeleteProductModal = (product) => {
    setIsOpen(true);
    setCurrentProduct(product);
  };

  const openEditProductModal = (product) => {
    setIsEditModal(true);
    setCurrentProduct(product);
  };

  return (
    <div className="table-products">
      <table className="table table-bordered table-hover table-dark table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{products.length > 0 && displayAllProducts()}</tbody>
      </table>
      {isEditModal && (
        <EditProductModal
          setIsEditModal={setIsEditModal}
          currentProduct={currentProduct}
          rerenderView={fetchProducts}
        />
      )}

      {modalIsOpen && (
        <DeleteProductModal
          setIsOpen={setIsOpen}
          currentProduct={currentProduct}
          rerenderView={fetchProducts}
        />
      )}
    </div>
  );
}

export default ProductsComponent;
