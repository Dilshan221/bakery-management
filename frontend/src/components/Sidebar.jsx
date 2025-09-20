// src/components/admin/Sidebar.jsx
import React from "react";

const Sidebar = ({ isActive, toggleSidebar, activeView, setActiveView }) => {
  const menuItems = [
    { icon: "fas fa-menorah", label: "Dashboard", view: "dashboard" },
    { icon: "fas fa-users", label: "User Management", view: "users" },
    { icon: "fas fa-chart-bar", label: "Attendance", view: "attendance" },
    { icon: "fas fa-database", label: "Report", view: "report" },
    { icon: "fas fa-cog", label: "Setting", view: "setting" },
  ];

  return (
    <>
      <div className="admin-toggle-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars" />
      </div>

      <nav className={`admin-nav ${isActive ? "active" : ""}`}>
        <ul className="admin-menu">
          <li>
            <a
              href="#"
              className="admin-logo"
              onClick={(e) => e.preventDefault()}
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=4e54c8&color=fff"
                alt="Admin"
              />
              <span className="admin-nav-item">Admin</span>
            </a>
          </li>

          {menuItems.map((item) => (
            <li key={item.view}>
              <a
                href="#"
                className={activeView === item.view ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView(item.view);
                }}
              >
                <i className={item.icon} />
                <span className="admin-nav-item">{item.label}</span>
              </a>
            </li>
          ))}

          <li className="admin-logout">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-sign-out-alt" />
              <span className="admin-nav-item">Log out</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
