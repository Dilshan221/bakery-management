import express from "express";
import {
  fetch,
  create,
  update,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", create);
router.get("/getAllUsers", fetch);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser);

export default router;
