import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useConvertPrice from "../../utils/useConvertPrice";
import { changeCounter, removeItem } from "../../store/cart/cartSlice";
import "./OrderProcessStepOne.scss";
import { IoTrashOutline } from "react-icons/io5";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { urlConfig } from "../../config/urlConfig";

function OrderProcessStepOne() {
  const { cart } = useSelector((state) => state.cartStore);
  const convertPrice = useConvertPrice();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((total, item) => total + item.totalAmount, 0));
  }, [cart]);

  return (
    <div className="row">
      <div className="card items-wrapper mt-4 py-4">
        <div className="title-heading">
          <h3>Shopping Cart</h3>
        </div>
        {cart.length > 0 ? (
          cart.map((item, index) => {
            return (
              <div className="card .item-wrapper mb-4" key={index}>
                <div className="card-body px-4">
                  <div className="item-img">
                    <img
                      src={`${urlConfig.backend}/uploads/${item.image}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="item-title">
                    <p>{item.title}</p>
                  </div>
                  <div className="item-quantity">
                    <button
                      className="btn-minus"
                      onClick={() =>
                        dispatch(changeCounter({ index, act: -1 }))
                      }
                    >
                      <FaMinus color="blue" />
                    </button>
                    <input
                      type="number"
                      name=""
                      id=""
                      value={item.count}
                      min={1}
                      max={50}
                      step={1}
                      className="form-control form-control-sm"
                    />
                    <button
                      className="btn-plus"
                      onClick={() => dispatch(changeCounter({ index, act: 1 }))}
                    >
                      <FaPlus color="blue" />
                    </button>
                  </div>
                  <div className="item-total">
                    <h5>{convertPrice(item.totalAmount)}</h5>
                  </div>
                  <div
                    className="item-trash"
                    onClick={() => dispatch(removeItem(index))}
                  >
                    <FaTrash color="tomato" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card text-center p-2 text-danger">
            <h5>There are no items in cart.</h5>
          </div>
        )}
        {cart.length > 0 && (
          <div className="card total-count">
            <p>Total </p>
            <p>{convertPrice(total)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderProcessStepOne;
