import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useConvertPrice from "../../utils/useConvertPrice";
import { changeCounter, removeItem } from "../../store/cart/cartSlice";
import "./OrderProcessStepOne.scss";
import { IoTrashOutline } from "react-icons/io5";
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
    <table className="table table-hover mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {cart.length ? (
          cart.map((item, index) => {
            return (
              <tr key={index} className="">
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={`${urlConfig.backend}/uploads/${item.image}`}
                    alt={item.title}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "contain",
                    }}
                  />
                </td>
                <td>{item.title}</td>
                <td>{convertPrice(item.price)}</td>
                <td>
                  <div className="counter-box">
                    <span
                      className="minus"
                      onClick={() =>
                        dispatch(changeCounter({ index, act: -1 }))
                      }
                    >
                      -
                    </span>
                    <span className="counter">{item.count}</span>
                    <span
                      className="plus"
                      onClick={() => dispatch(changeCounter({ index, act: 1 }))}
                    >
                      +
                    </span>
                  </div>
                </td>
                <td>{convertPrice(item.totalAmount)}</td>
                <td className="trash">
                  <IoTrashOutline
                    size={21}
                    onClick={() => dispatch(removeItem(index))}
                  />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>The Cart is empty</td>
          </tr>
        )}
        {cart.length > 0 && (
          <tr className="table-info">
            <td colSpan="5">
              <strong>TOTAL</strong>
            </td>
            <td colSpan="2">
              <strong>{convertPrice(total)}</strong>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default OrderProcessStepOne;
