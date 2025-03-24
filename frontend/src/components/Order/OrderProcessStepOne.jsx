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
    // <table className="table table-hover mt-4">
    //   <thead>
    //     <tr>
    //       <th scope="col">Product</th>
    //       <th scope="col">Quantity</th>
    //       <th scope="col">Total</th>
    //     </tr>
    //   </thead>
    //   <tbody className="align-middle">
    //     {cart.length ? (
    //       cart.map((item, index) => {
    //         return (
    //           <tr key={index} className="">
    //             <td className="img-title">
    //               <img
    //                 src={`${urlConfig.backend}/uploads/${item.image}`}
    //                 alt={item.title}
    //                 style={{
    //                   width: "70px",
    //                   height: "70px",
    //                   objectFit: "contain",
    //                 }}
    //               />
    //               {item.title}
    //             </td>
    //             <td>
    //               <div className="counter-box">
    //                 <span
    //                   className="minus"
    //                   onClick={() =>
    //                     dispatch(changeCounter({ index, act: -1 }))
    //                   }
    //                 >
    //                   -
    //                 </span>
    //                 <span className="counter">{item.count}</span>
    //                 <span
    //                   className="plus"
    //                   onClick={() => dispatch(changeCounter({ index, act: 1 }))}
    //                 >
    //                   +
    //                 </span>
    //               </div>
    //             </td>
    //             <td>{convertPrice(item.totalAmount)}</td>
    //           </tr>
    //         );
    //       })
    //     ) : (
    //       <tr>
    //         <td>The Cart is empty</td>
    //       </tr>
    //     )}
    //     {cart.length > 0 && (
    //       <tr className="table-info">
    //         <td colSpan="2">
    //           <strong>TOTAL</strong>
    //         </td>
    //         <td colSpan="1">
    //           <strong>{convertPrice(total)}</strong>
    //         </td>
    //       </tr>
    //     )}
    //   </tbody>
    // </table>
    <div className="row">
      <div className="card items-wrapper mt-4 py-4">
        <div className="title-heading">
          <h3>Shopping Cart</h3>
        </div>
        {cart.length > 0 ? (
          cart.map((item, index) => {
            return (
              <div className="card .item-wrapper mb-4">
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
