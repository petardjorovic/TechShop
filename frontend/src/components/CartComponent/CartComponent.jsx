import { FaShoppingCart } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

import "./CartComponent.scss";
import { useSelector } from "react-redux";
import useConvertPrice from "../../utils/useConvertPrice";
import { Link } from "react-router-dom";
import { useState } from "react";

function CartComponent() {
  const { cart } = useSelector((state) => state.cartStore);
  const convertPrice = useConvertPrice();
  const [showDropdown, setShowDropdown] = useState(false);
  const displayAllItems = () => {
    return (
      <div className="cart-dropdown">
        {cart.map((item, i) => {
          return (
            <div className="dropdown-row" key={i}>
              <img
                src={`http://localhost:4000/uploads/${item.image}`}
                alt={item.title}
              />
              <span className="title">{item.title}</span>
              <div className="counter-box">
                <span className="plus">+</span>
                <span className="counter">1</span>
                <span className="minus">-</span>
              </div>
              <span className="price">{convertPrice(item.price)}</span>
              <span>
                <IoTrashOutline size={16} />
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
