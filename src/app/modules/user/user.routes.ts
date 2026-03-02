import { Router } from "express";
import { UserControllers } from "./user.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { UserValidations } from "./user.validation.js";

const router = Router();

// Create user
router.post(
  "/register",
  validateRequest(UserValidations.createUserValidation),
  UserControllers.createUser
);

// Get all users
router.get("/all-users", UserControllers.getAllUsers);

// Get single user
router.get("/:id", UserControllers.getSingleUser);

// Update user
router.patch(
  "/:id",
  validateRequest(UserValidations.updateUserValidation),
  UserControllers.updateUser
);

// Soft delete user
router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;