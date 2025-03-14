import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useConvertPrice from "../../utils/useConvertPrice";
import { changeCounter, removeItem } from "../../store/cart/cartSlice";
import "./OrderProcessStepOne.scss";
import { IoTrashOutline } from "react-icons/io5";

function OrderProcessStepOne() {
  const { cart } = useSelector((state) => state.cartStore);
  const convertPrice = useConvertPrice();
  const dispatch = useDispatch();
  return (
    <table className="table table-hover">
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
      <tbody>
        {cart.length ? (
          cart.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={`http://localhost:4000/uploads/${item.image}`}
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
                      className="plus"
                      onClick={() => dispatch(changeCounter({ index, act: 1 }))}
                    >
                      +
                    </span>
                    <span className="counter">{item.count}</span>
                    <span
                      className="minus"
                      onClick={() =>
                        dispatch(changeCounter({ index, act: -1 }))
                      }
                    >
                      -
                    </span>
                  </div>
                </td>
                <td>{convertPrice(item.totalAmount)}</td>
                <td>
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
      </tbody>
    </table>
  );
}

export default OrderProcessStepOne;
