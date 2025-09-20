// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PublicLayout from "./components/Public/PublicLayout";
import Layout from "./components/website/Layout";

// Public pages
import Home from "./pages/Home";
import About from "./pages/aboutus";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import Elements from "./pages/element";
import Gallery from "./pages/gallery";
import Menu from "./pages/menu";
import Services from "./pages/service";
// ✅ NEW: customer landing page
import RegisterHome from "./pages/registerhome";

// login / signup pages
import Signup from "./components/user/signup";
import Login from "./components/user/login";

// Admin UI
import Sidebar from "./components/admin/Sidebar";
import Header from "./components/admin/Header";
import Stats from "./components/admin/Stats";
import EmployeeCards from "./components/admin/EmployeeCards";
import AttendanceList from "./components/admin/AttendanceList";
import UserManagement from "./components/admin/UserManagement";

// Admin styles only
import "./styles/admin.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public: CSS scope -> Website layout -> Pages */}
        <Route element={<PublicLayout />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="elements" element={<Elements />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="menu" element={<Menu />} />
            <Route path="services" element={<Services />} />
            {/* ✅ NEW route */}
            <Route path="registerhome" element={<RegisterHome />} />
          </Route>
        </Route>

        {/* Auth */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Admin (no auth in your setup) */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Admin dashboard layout
const AdminDashboard = () => {
  const [sidebarActive, setSidebarActive] = React.useState(false);
  const [activeView, setActiveView] = React.useState("dashboard");
  const toggleSidebar = () => setSidebarActive((s) => !s);

  const renderAdminContent = () => {
    switch (activeView) {
      case "users":
        return <UserManagement />;
      case "attendance":
        return <AttendanceList />;
      case "dashboard":
      default:
        return (
          <>
            <Stats />
            <EmployeeCards />
            <AttendanceList />
          </>
        );
    }
  };

  return (
    <div className="admin-container">
      <Sidebar
        isActive={sidebarActive}
        toggleSidebar={toggleSidebar}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <section
        className={`admin-main ${sidebarActive ? "admin-main-expanded" : ""}`}
      >
        <Header />
        {renderAdminContent()}
      </section>
    </div>
  );
};

export default App;
