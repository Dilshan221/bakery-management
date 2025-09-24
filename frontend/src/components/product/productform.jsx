import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiService from "../../services/api";

export default function ProductForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "", // storing image URL for backend field parity
  });

  const [imagePreview, setImagePreview] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const fileInputRef = useRef(null);

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageUploadClick = () => fileInputRef.current?.click();

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setHasImage(true);
      // For now we store the dataURL into image; in prod use an uploader (S3/Cloudinary)
      setForm((prev) => ({ ...prev, image: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) previewImage(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = "#ff6f61";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = hasImage ? "#27ae60" : "#ccc";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = "#27ae60";
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      if (fileInputRef.current)
        fileInputRef.current.files = e.dataTransfer.files;
      previewImage(file);
    }
  };

  const removeImage = (e) => {
    e?.stopPropagation();
    setImagePreview("");
    setHasImage(false);
    setForm((p) => ({ ...p, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // basic validations
      if (!form.name?.trim()) return alert("Product name is required");
      if (!form.description?.trim()) return alert("Description is required");
      if (!form.price || Number(form.price) < 0)
        return alert("Valid price required");
      if (!form.quantity || Number(form.quantity) <= 0)
        return alert("Valid quantity required");
      if (!form.image) return alert("Please upload a product image");

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        quantity: Number(form.quantity),
        image: form.image, // dataURL or URL
      };

      await apiService.createProduct(payload);
      alert("Product added successfully!");
      navigate("/admin/product/dashboard");
    } catch (err) {
      alert(err?.data?.message || err?.message || "Error while adding product");
    }
  };

  return (
    <div>
      {/* Sidebar (peach, same as dashboard) */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Cake &amp; Bake</h2>
        </div>
        <nav>
          <Link to="/admin/product/dashboard">Dashboard</Link>
          <Link to="/admin/product/form" className="active">
            Add Product
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main">
        <h1>Add Product</h1>

        <div className="form-container">
          <form id="addProductForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                placeholder="Enter product description"
                value={form.description}
                onChange={onChange}
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="image-upload-container">
              <label className="image-upload-label">Product Image</label>
              <div
                className={`image-upload-box ${hasImage ? "has-image" : ""}`}
                id="imageUploadBox"
                onClick={handleImageUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!hasImage && (
                  <>
                    <p>Click to upload or drag and drop</p>
                    <p>PNG, JPG up to 5MB</p>
                  </>
                )}

                <input
                  type="file"
                  id="productImage"
                  className="image-upload-input"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                {hasImage && (
                  <>
                    <img
                      id="imagePreview"
                      className="image-preview"
                      src={imagePreview}
                      alt="Product preview"
                      style={{ display: "block" }}
                    />
                    <div
                      className="remove-image"
                      id="removeImage"
                      onClick={removeImage}
                      style={{ display: "block" }}
                    >
                      Remove image
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity Level</label>
              <input
                type="number"
                id="quantity"
                min="1"
                placeholder="Enter stock quantity"
                value={form.quantity}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Product Price</label>
              <input
                type="number"
                id="price"
                min="0"
                step="0.01"
                placeholder="Enter product price"
                value={form.price}
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Add Product
            </button>
          </form>
        </div>
      </div>

      {/* Inline styles to match your dashboard theme */}
      <style>{`
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
          border-right: 1px solid #f0d8cd;
        }
        .sidebar .logo { text-align: center; margin-bottom: 30px; }
        .sidebar .logo h2 { font-family: "Brush Script MT", cursive; color: #e74c3c; }
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
        .sidebar nav a.active { background: #ff6f61; color: white; }
        .main { margin-left: 250px; padding: 30px; width: 100%; }
        .main h1 { font-size: 28px; margin-bottom: 20px; color: #e74c3c; }
        .form-container {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          max-width: 600px;
        }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 6px; font-weight: bold; color: #333; }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
          box-sizing: border-box;
        }
        .form-group textarea { resize: none; height: 80px; }
        .btn-submit {
          background: #27ae60;
          color: white;
          padding: 10px 18px;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .btn-submit:hover { background: #1e8449; }
        .image-upload-container { margin-bottom: 15px; }
        .image-upload-label { display: block; margin-bottom: 6px; font-weight: bold; color: #333; }
        .image-upload-box {
          border: 2px dashed #ccc;
          border-radius: 6px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        .image-upload-box:hover { border-color: #ff6f61; }
        .image-upload-box.has-image { border-style: solid; border-color: #27ae60; }
        .image-preview {
          max-width: 100%;
          max-height: 200px;
          margin-top: 15px;
          border-radius: 4px;
        }
        .image-upload-input { display: none; }
        .remove-image { color: #e74c3c; cursor: pointer; margin-top: 10px; }
      `}</style>
    </div>
  );
}
