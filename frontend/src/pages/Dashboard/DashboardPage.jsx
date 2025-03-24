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
      {/* "row m-0" */}
      <div className="dashboard-content">
        {/* "col-md-3 p-0" */}
        <div className="sidebar">
          <SidebarComponent />
        </div>
        {/* "col-md-9 p-0" */}
        <div className="content">
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
