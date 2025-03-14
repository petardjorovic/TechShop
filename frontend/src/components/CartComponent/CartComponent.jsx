import { useDispatch, useSelector } from "react-redux";
import useConvertPrice from "../../utils/useConvertPrice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CartComponent.scss";
import { FaShoppingCart } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import {
  changeCounter,
  removeItem,
  resetNewOldMessage,
} from "../../store/cart/cartSlice";
import { toast } from "react-toastify";

function CartComponent() {
  const { cart, isNewItem, isOldItem } = useSelector(
    (state) => state.cartStore
  );
  const convertPrice = useConvertPrice();
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    isNewItem && toast.success("You've added new item to cart");
    isOldItem && toast.warning("You've increased item count in cart");
    dispatch(resetNewOldMessage());
  }, [cart]);
  const displayAllItems = () => {
    return (
      <div className="cart-dropdown">
        {cart.map((item, index) => {
          return (
            <div className="dropdown-row" key={index}>
              <img
                src={`http://localhost:4000/uploads/${item.image}`}
                alt={item.title}
              />
              <span className="title">{item.title}</span>
              <div className="counter-box">
                <span
                  className="plus"
                  onClick={() => dispatch(changeCounter({ index, act: 1 }))}
                >
                  +
                </span>
                <span className="counter">{item.count}</span>
                <span
                  className="minus"
                  onClick={() => dispatch(changeCounter({ index, act: -1 }))}
                >
                  -
                </span>
              </div>
              <span className="price">{convertPrice(item.totalAmount)}</span>
              <span>
                <IoTrashOutline
                  size={16}
                  onClick={() => dispatch(removeItem(index))}
                />
              </span>
            </div>
          );
        })}
        <Link to={"/order"} className="btn btn-sm btn-info mt-2">
          Go to Checkout
        </Link>
      </div>
    );
  };
  return (
    <div
      className="cart-wrapper"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <Link to={"/order"}>
        <FaShoppingCart size={25} />
      </Link>
      {cart.length > 0 && <div className="cart-count">{cart.length}</div>}
      {showDropdown && cart.length > 0 ? displayAllItems() : null}
    </div>
  );
}

export default CartComponent;
