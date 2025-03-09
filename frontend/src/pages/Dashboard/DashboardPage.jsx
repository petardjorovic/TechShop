import React from "react";
import SidebarComponent from "../../AdminComponents/Sidebar/SidebarComponent";
import "./DashboardPage.scss";

function DashboardPage() {
  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-md-3 p-0">
          <SidebarComponent />
        </div>
        <div className="col-md-9 p-0">
          <h1>Views</h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
