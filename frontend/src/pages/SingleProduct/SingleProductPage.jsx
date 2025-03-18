import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import { getSingleProduct } from "../../services/productServices";
import "./SingleProductPage.scss";
import useConvertPrice from "../../utils/useConvertPrice";
import { addToCart } from "../../store/cart/cartSlice";
import LeaveCommentComponent from "../../components/LeaveComment/LeaveCommentComponent";

function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const convertPrice = useConvertPrice();

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(showLoader(true));
      const res = await getSingleProduct(productId);
      dispatch(showLoader(false));
      if (res.status === "success") {
        setProduct(res.product);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="container">
      {product.hasOwnProperty("_id") && (
        <div className="product-wrapper">
          <div className="product-left">
            <img
              src={`http://localhost:4000/uploads/${product.image}`}
              alt={product.title}
            />
          </div>
          <div className="product-right">
            <h1>{product.title}</h1>
            <p className="description">{product.description}</p>
            <div className="bottom">
              <p className="price">{convertPrice(product.price)}</p>
              <button onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {product.hasOwnProperty("_id") && (
        <LeaveCommentComponent product={product} />
      )}
    </div>
  );
}

export default SingleProductPage;
