import { Router } from "express";
import { UserControllers } from "./user.controller.js";

const router = Router();

// Create user
router.post("/register", UserControllers.createUser);

// Get all users
router.get("/", UserControllers.getAllUsers);

// Get single user
router.get("/:id", UserControllers.getSingleUser);

// Update user
router.patch("/:id", UserControllers.updateUser);

// Soft delete user
router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;


// Route matching -> Controller -> Service Layer -> Model -> DB