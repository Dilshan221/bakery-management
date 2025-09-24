import express from "express";
import * as productCtrl from "../controllers/Productcontroller.js";

const router = express.Router();

// Runtime guard to catch missing exports fast (remove after it works)
[
  "getAllProducts",
  "addProducts",
  "getById",
  "updateProduct",
  "deleteProduct",
].forEach((fn) => {
  if (typeof productCtrl[fn] !== "function") {
    console.error(`[products] Missing controller export: ${fn}`);
  }
});

router.get("/", productCtrl.getAllProducts);
router.post("/", productCtrl.addProducts);
router.get("/:id", productCtrl.getById);
router.put("/:id", productCtrl.updateProduct);
router.delete("/:id", productCtrl.deleteProduct);

export default router;
