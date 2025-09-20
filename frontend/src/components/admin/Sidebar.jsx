// src/components/admin/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isActive, toggleSidebar, activeView, setActiveView }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: "fas fa-menorah", label: "Dashboard", view: "dashboard" },
    { icon: "fas fa-users", label: "User Management", view: "users" },
    { icon: "fas fa-chart-bar", label: "Attendance", view: "attendance" },
    { icon: "fas fa-database", label: "Report", view: "report" },
    { icon: "fas fa-cog", label: "Setting", view: "setting" },
  ];

  const handleLogout = () => {
    navigate("/"); // simply go to home (or login page if you add one later)
  };

  return (
    <>
      <div className="admin-toggle-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </div>
      <nav className={`admin-nav ${isActive ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#" className="admin-logo">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=4e54c8&color=fff"
                alt="Admin"
              />
              <span className="admin-nav-item">Admin</span>
            </a>
          </li>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={activeView === item.view ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView(item.view);
                }}
              >
                <i className={item.icon}></i>
                <span className="admin-nav-item">{item.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="admin-logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="admin-nav-item">Log out</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
