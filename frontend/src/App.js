import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

/* ---------- Public wrappers ---------- */
import PublicLayout from "./components/Public/PublicLayout";
import Layout from "./components/website/Layout";

/* ---------- Public pages ---------- */
import Home from "./pages/Home";
import About from "./pages/aboutus";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import Elements from "./pages/element";
import Gallery from "./pages/gallery";
import Menu from "./pages/menu";
import Services from "./pages/service";
import RegisterHome from "./pages/registerhome";

/* ---------- Auth ---------- */
import Signup from "./components/user/signup";
import Login from "./components/user/login";

/* ---------- ORIGINAL admin (keeps blue header) ---------- */
import AdminSidebar from "./components/admin/Sidebar";
import AdminHeader from "./components/admin/Header";
import AdminDashboard from "./components/admin/AdminDashboard"; // ✅ new
import AttendanceList from "./components/admin/AttendanceList";
import UserManagement from "./components/admin/UserManagement";

/* ---------- USER admin (blue header removed) ---------- */
import AddAdmin from "./components/user/AdminForm";
import AdminManager from "./components/user/AdminTable";
import UserAdminDashboard from "./components/user/Admindashboard";
import UserSidebar from "./components/user/Sidebar";

/* ---------- Product pages (no header/sidebar) ---------- */
import ProductDashboard from "./components/product/addproduct";
import ProductForm from "./components/product/productform";

import "./styles/admin.css";

/* ---- Shells ---- */

// Original Admin Shell (keeps header + sidebar)
function AdminShell() {
  const [sidebarActive, setSidebarActive] = React.useState(false);
  return (
    <div className="admin-container">
      <AdminSidebar
        isActive={sidebarActive}
        toggleSidebar={() => setSidebarActive((s) => !s)}
      />
      <section
        className={`admin-main ${sidebarActive ? "admin-main-expanded" : ""}`}
      >
        <AdminHeader />
        <Outlet />
      </section>
    </div>
  );
}

// User Admin Shell (no blue header)
function UserAdminShell() {
  const [sidebarActive, setSidebarActive] = React.useState(false);
  return (
    <div className="admin-container">
      <UserSidebar
        isActive={sidebarActive}
        toggleSidebar={() => setSidebarActive((s) => !s)}
      />
      <section
        className={`admin-main ${sidebarActive ? "admin-main-expanded" : ""}`}
      >
        <Outlet />
      </section>
    </div>
  );
}

// Product Shell (no header, no sidebar) + color skin wrapper
function ProductShell() {
  return (
    <div className="product-skin">
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ---------- PRODUCT (no header/sidebar) ---------- */}
        <Route path="/admin/product/*" element={<ProductShell />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProductDashboard />} />
          <Route path="form" element={<ProductForm />} />
          {/* alias to handle the common typo /from -> /form */}
          <Route path="from" element={<Navigate to="form" replace />} />
        </Route>

        {/* ---------- USER ADMIN ---------- */}
        <Route path="/useradmin/*" element={<UserAdminShell />}>
          <Route index element={<UserAdminDashboard />} />
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="adminmanager" element={<AdminManager />} />
          <Route path="editadmin/:id" element={<AddAdmin />} />
          <Route path="*" element={<Navigate to="/useradmin" replace />} />
        </Route>

        {/* ---------- ORIGINAL ADMIN (keeps header/sidebar) ---------- */}
        <Route path="/admin/*" element={<AdminShell />}>
          {/* ✅ Proper dashboard page */}
          <Route index element={<AdminDashboard />} />
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* ---------- PUBLIC SITE ---------- */}
        <Route element={<PublicLayout />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="elements" element={<Elements />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="menu" element={<Menu />} />
            <Route path="services" element={<Services />} />
            <Route path="registerhome" element={<RegisterHome />} />
          </Route>
        </Route>

        {/* ---------- AUTH ---------- */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* ---------- GLOBAL FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
