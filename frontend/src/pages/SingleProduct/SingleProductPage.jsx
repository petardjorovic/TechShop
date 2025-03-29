import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import {
  getSingleProduct,
  rateSingleProduct,
} from "../../services/productServices";
import "./SingleProductPage.scss";
import useConvertPrice from "../../utils/useConvertPrice";
import { addToCart } from "../../store/cart/cartSlice";
import LeaveCommentComponent from "../../components/LeaveComment/LeaveCommentComponent";
import { urlConfig } from "../../config/urlConfig";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import { setUser } from "../../store/user/userSlice";
import { localStorageConfig } from "../../config/LocalStorageConfig";

function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [rateValue, setRateValue] = useState(0);
  const dispatch = useDispatch();
  const convertPrice = useConvertPrice();
  const { user } = useSelector((state) => state.userStore);

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(showLoader(true));
      const res = await getSingleProduct(productId);
      dispatch(showLoader(false));
      if (res.status === "success") {
        setProduct(res.product);
        let avgRating = (
          res.product.allRatings.reduce((total, rate) => total + rate, 0) /
          res.product.allRatings.length
        ).toFixed(2);
        setRateValue(parseFloat(avgRating));
      }
    };
    fetchProduct();
  }, []);

  const sendUserVote = async (newValue) => {
    if (newValue === null) return;

    if (!user.hasOwnProperty("username")) {
      toast.error("Please login to rate this product");
      return;
    }
    if (user?.votedFor?.includes(productId)) {
      toast.error("You have already rated this product");
      return;
    }
    dispatch(showLoader(true));
    const res = await rateSingleProduct(newValue, productId);
    dispatch(showLoader(false));
    if (res.status === "success") {
      // setProduct({ ...product, allRatings: [...product.allRatings, newValue] });
      // dispatch(voteUser(productId));
      setProduct(res.product);
      dispatch(setUser(res.user));
      localStorage.setItem(localStorageConfig.USER, JSON.stringify(res.user));
      let newArray = [...product.allRatings, newValue];
      let avgRating = (
        newArray.reduce((total, rate) => total + rate, 0) / newArray.length
      ).toFixed(2);
      setRateValue(parseFloat(avgRating));
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="container">
      {product.hasOwnProperty("_id") && (
        <div className="product-wrapper">
          <div className="product-left">
            <img
              src={`${urlConfig.backend}/uploads/${product.image}`}
              alt={product.title}
            />
          </div>
          <div className="product-right">
            <h1>{product.title}</h1>
            <p className="description">{product.description}</p>
            <p className="reviews">
              Reviews:{" "}
              {/* {!user.hasOwnProperty("username") ||
              user?.votedFor?.includes(productId) ? (
                <Rating
                  name="read-only"
                  value={rateValue}
                  precision={0.5}
                  readOnly
                />
              ) : ( */}
              <Rating
                name="simple-controlled"
                value={rateValue}
                precision={1}
                onChange={(event, newValue) => {
                  sendUserVote(newValue);
                }}
              />
              {/* )} */}
            </p>
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
