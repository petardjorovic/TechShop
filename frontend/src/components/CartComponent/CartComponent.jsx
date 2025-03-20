import { useDispatch, useSelector } from "react-redux";
import useConvertPrice from "../../utils/useConvertPrice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CartComponent.scss";
import { FaShoppingCart } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    isNewItem && toast.success("You've added new item to cart");
    isOldItem && toast.warning("You've increased item count in cart");
    dispatch(resetNewOldMessage());
    setTotalAmount(cart.reduce((total, item) => total + item.totalAmount, 0));
  }, [cart]);

  const displayAllItems = () => {
    return (
      <div className="cart-dropdown-container">
        <div className="shopping-cart">
          <div className="shopping-cart-header">
            <div className="shopping-cart-badge">
              <FaShoppingCart size={30} />
              <span className="badge-count">{cart.length}</span>
            </div>
            <div className="shopping-cart-total">
              <span className="lighter-text">Total: </span>
              <span className="main-color-text">
                {convertPrice(totalAmount)}
              </span>
            </div>
          </div>
          <div className="shopping-cart-items">
            {cart.map((item, index) => {
              return (
                <div key={index} className="clearfix">
                  <img
                    src={`https://backendpetarshop.onrender.com/uploads/${item.image}`}
                    alt={item.title}
                  />
                  <div className="item-content">
                    <p className="item-name">{item.title}</p>
                    <div className="price-quantity">
                      <span className="item-price">
                        {convertPrice(item.price)}
                      </span>
                      <span className="item-quantity">Qty: {item.count}</span>
                    </div>
                  </div>

                  <IoIosCloseCircleOutline
                    size={18}
                    className="trash"
                    onClick={() => dispatch(removeItem(index))}
                  />
                </div>
              );
            })}
          </div>
          <Link to={"/order"} className="checkout-btn">
            Checkout
          </Link>
        </div>
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
      {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      {showDropdown && cart.length > 0 ? displayAllItems() : null}
    </div>
  );
}

export default CartComponent;
