import Product from "../Models/Productmodel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({ products });
  } catch (err) {
    console.error("getAllProducts error:", err);
    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const addProducts = async (req, res) => {
  try {
    const { name, description, price, image, quantity } = req.body;
    if (!name || !description || price == null || !image || quantity == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const product = await Product.create({
      name: String(name).trim(),
      description: String(description).trim(),
      price: Number(price),
      image: String(image).trim(),
      quantity: Number(quantity),
    });
    return res.status(201).json({ product });
  } catch (err) {
    console.error("addProducts error:", err);
    return res.status(500).json({ message: "Error while adding product" });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (err) {
    console.error("getById error:", err);
    return res.status(500).json({ message: "Error fetching product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, quantity },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Unable to update" });
    return res.status(200).json({ product });
  } catch (err) {
    console.error("updateProduct error:", err);
    return res.status(500).json({ message: "Error while updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Unable to delete product" });
    return res.status(200).json({ product });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({ message: "Error while deleting product" });
  }
};
