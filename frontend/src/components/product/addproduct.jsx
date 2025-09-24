import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/api";

export default function AddProductDashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await apiService.listProducts(); // { products: [...] }
      setRows(data?.products || []);
    } catch (e) {
      setErr(e?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await apiService.deleteProduct(id);
      setRows((prev) => prev.filter((r) => r._id !== id));
    } catch (e) {
      alert(e?.data?.message || e?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <h2>Cake &amp; Bake</h2>
        </div>
        <nav>
          <Link to="/admin/product/dashboard" className="active">
            Dashboard
          </Link>
          <Link to="/admin/product/form">Add Product</Link>
        </nav>
      </div>

      <div className="main">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>View Products</h1>
          <Link to="/admin/product/form" className="btn btn-edit">
            + Add Product
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : err ? (
          <p style={{ color: "#e74c3c" }}>{err}</p>
        ) : rows.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td style={{ maxWidth: 260, textAlign: "left" }}>
                    {p.description}
                  </td>
                  <td>{p.quantity}</td>
                  <td>${Number(p.price).toFixed(2)}</td>
                  <td>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          borderRadius: 6,
                          border: "1px solid #eee",
                        }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {/* You can route to an edit page later; for now reuse /form with prefill if needed */}
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{`
        body {
          margin: 0;
          font-family: "Arial", sans-serif;
          background: #fdfdfd;
          color: #333;
          display: flex;
        }
        .sidebar {
          width: 250px;
          background: #ffe9dc;
          min-height: 100vh;
          padding: 20px;
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
        }
        .sidebar .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .sidebar .logo h2 {
          font-family: "Brush Script MT", cursive;
          color: #e74c3c;
        }
        .sidebar nav a {
          display: block;
          text-decoration: none;
          padding: 12px 10px;
          color: #333;
          margin: 5px 0;
          border-radius: 6px;
          transition: 0.3s;
          font-weight: 500;
        }
        .sidebar nav a:hover,
        .sidebar nav a.active {
          background: #ff6f61;
          color: white;
        }
        .main {
          margin-left: 250px;
          padding: 30px;
          width: 100%;
        }
        .main h1 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #e74c3c;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        table thead {
          background: #ff6f61;
          color: white;
        }
        table th,
        table td {
          padding: 14px 16px;
          text-align: center;
          border-bottom: 1px solid #eee;
        }
        table tr:hover {
          background: #f9f9f9;
        }
        .btn {
          padding: 8px 14px;
          font-size: 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          color: white;
          transition: 0.3s;
        }
        .btn-edit {
          background: #3498db;
        }
        .btn-edit:hover {
          background: #2c80b4;
        }
        .btn-delete {
          background: #e74c3c;
        }
        .btn-delete:hover {
          background: #c0392b;
        }
      `}</style>
    </div>
  );
}
