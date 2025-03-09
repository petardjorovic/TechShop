import "./SidebarComponent.scss";
import { adminSidebarConfig } from "../../config/AdminSidebarConfig";
import { useState } from "react";

function SidebarComponent() {
  const [activeView, setActiveView] = useState(adminSidebarConfig[0].name);
  const displayNavigation = () => {
    return adminSidebarConfig.map((el, i) => {
      return (
        <li
          key={i}
          onClick={() => changeView(el.name)}
          className={activeView === el.name ? "active" : null}
        >
          <i className={el.icon}></i>
          <span>{el.name}</span>
        </li>
      );
    });
  };

  const changeView = (item) => {
    setActiveView(item);
    // ToDo menjamo views
  };

  return (
    <>
      <div className="sidebar-wrapper">
        <div className="header">
          <h3>Admin Dashboard</h3>
        </div>
        <div className="navigation">
          <nav>
            <ul>{displayNavigation()}</ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default SidebarComponent;
