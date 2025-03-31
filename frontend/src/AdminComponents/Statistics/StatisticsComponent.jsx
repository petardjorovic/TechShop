import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { LiaEnvelopeOpenTextSolid } from "react-icons/lia";
import "./StatisticsComponent.scss";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import { getAllProducts } from "../../services/productServices";
import { getAllUsers } from "../../services/adminService";

function StatisticsComponent() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoader(true));
      const res = await getAllProducts();
      const res1 = await getAllUsers();
      dispatch(showLoader(false));

      if (res.status === "success") setProducts(res.products);
      if (res1.status === "success") setUsers(res1.allUsers);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Statistics</h1>
      <div className="statistics-wrapper">
        <div className="box">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  <div className="text-white-75 small">Users:</div>
                  <div className="text-lg fw-bold">
                    {users.length > 0 && users.length}
                  </div>
                </div>
                <div className="">
                  <FaUsers size={28} />
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between small">
              <a className="text-white streched-link" role="button">
                View Report
              </a>
              <div className="text-white" role="button">
                <MdArrowForwardIos />
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  <div className="text-white-75 small">Products:</div>
                  <div className="text-lg fw-bold">
                    {products.length > 0 && products.length}
                  </div>
                </div>
                <div>
                  <i className="ion-cube fs-3"></i>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between small">
              <a className="text-white streched-link" role="button">
                View Report
              </a>
              <div className="text-white" role="button">
                <MdArrowForwardIos />
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  <div className="text-white-75 small">Emails:</div>
                  <div className="text-lg fw-bold">0</div>
                </div>
                <div>
                  <i className="ion-email fs-3"></i>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between small">
              <a className="text-white streched-link" role="button">
                View Report
              </a>
              <div className="text-white" role="button">
                <MdArrowForwardIos />
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="card bg-danger text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  <div className="text-white-75 small">Subscriptions:</div>
                  <div className="text-lg fw-bold">N/A</div>
                </div>
                <div>
                  <LiaEnvelopeOpenTextSolid size={28} />
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between small">
              <a className="text-white streched-link" role="button">
                View Report
              </a>
              <div className="text-white" role="button">
                <MdArrowForwardIos />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsComponent;
