import React from "react";
import SidebarComponent from "../../AdminComponents/Sidebar/SidebarComponent";
import "./DashboardPage.scss";
import { Outlet } from "react-router-dom";
import LoaderComponent from "../../components/Loader/LoaderComponent";
import { ToastContainer } from "react-toastify";
import { IoMenu } from "react-icons/io5";

function DashboardPage() {
  return (
    <div className="container-fluid p-0">
      <LoaderComponent />
      <div className="row m-0">
        <div className="col-md-3 p-0">
          <SidebarComponent />
        </div>
        <div className="col-md-9 p-0">
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
