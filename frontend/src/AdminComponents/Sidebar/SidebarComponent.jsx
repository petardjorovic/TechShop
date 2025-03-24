import "./SidebarComponent.scss";
import { adminSidebarConfig } from "../../config/AdminSidebarConfig";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function SidebarComponent() {
  const [activeView, setActiveView] = useState(adminSidebarConfig[0].name);
  const navigate = useNavigate();
  const displayNavigation = () => {
    return adminSidebarConfig.map((el, i) => {
      return (
        <li
          key={i}
          onClick={() => changeView(el.name, el.url)}
          className={activeView === el.name ? "active" : null}
        >
          <i className={el.icon}></i>
          <span className="title">{el.name}</span>
        </li>
      );
    });
  };

  const changeView = (item, url) => {
    setActiveView(item);
    navigate(url);
  };

  return (
    <>
      <div className="sidebar-wrapper">
        <div className="header">
          <h3>
            Dashboard &nbsp; / &nbsp; <Link to={"/"}>Home</Link>
          </h3>
          <h4>
            <Link to={"/"}>
              <i className="ion-home"></i>
            </Link>
          </h4>
          <span></span>
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
