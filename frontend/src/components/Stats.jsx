import React from "react";

const Stats = () => {
  const statsData = [
    {
      icon: "fas fa-check-circle",
      value: "85%",
      label: "Present Employees",
      className: "icon-present",
    },
    {
      icon: "fas fa-clock",
      value: "8%",
      label: "Late Arrivals",
      className: "icon-late",
    },
    {
      icon: "fas fa-times-circle",
      value: "7%",
      label: "Absent Today",
      className: "icon-absent",
    },
    {
      icon: "fas fa-users",
      value: "42",
      label: "Total Employees",
      className: "icon-total",
    },
  ];

  return (
    <div className="stats">
      {statsData.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className={`stat-icon ${stat.className}`}>
            <i className={stat.icon}></i>
          </div>
          <div className="stat-info">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
