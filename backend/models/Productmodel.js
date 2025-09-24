import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// force collection "products"
const Product = mongoose.model("Product", productSchema, "products");
export default Product;
