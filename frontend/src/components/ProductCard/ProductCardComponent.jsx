import { useSelector } from "react-redux";
import "./ProductCardComponent.scss";
import useConvertPrice from "../../utils/useConvertPrice";
import { Link } from "react-router-dom";
import { urlConfig } from "../../config/urlConfig";

function ProductCardComponent({ product }) {
  const convertPrice = useConvertPrice();
  return (
    <div className="product-card-wrapper">
      <img
        src={`${urlConfig.backend}/uploads/${product.image}`}
        alt={product.title}
        className="product-img"
      />
      <div className="product-content">
        <h5>{product.title}</h5>
        <p>{product.description}</p>
      </div>
      <div className="product-footer">
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-primary">View Product</button>
        </Link>
        <span>{convertPrice(product.price)}</span>
      </div>
    </div>
  );
}

export default ProductCardComponent;
