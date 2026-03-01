import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import { UserService } from "./user.service.js";
import { IUser } from "./user.interface.js";
import { AppError } from "../../errorHelpers/app-error.js";
import { catchAsync } from "../../middlewares/catch-async.js";
import { sendResponse } from "../../../utils/sendResponse.js";

/**
 * Create User
 */
export const createUser = catchAsync(
  async (req: Request, res: Response) => {
    const payload: Partial<IUser> = req.body;

    const user = await UserService.createUser(payload);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User created successfully",
      data: user,
    });
  }
);

/**
 * Get All Users
 */
export const getAllUsers = catchAsync(
  async (_req: Request, res: Response) => {
    const users = await UserService.getAllUsers();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  }
);

/**
 * Get Single User
 */
export const getSingleUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid user ID", StatusCodes.BAD_REQUEST);
    }

    const user = await UserService.getUserById(id);

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  }
);

/**
 * Update User
 */
export const updateUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid user ID", StatusCodes.BAD_REQUEST);
    }

    const updatedUser = await UserService.updateUser(id, req.body);

    if (!updatedUser) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }
);

/**
 * Soft Delete User
 */
export const deleteUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid user ID", StatusCodes.BAD_REQUEST);
    }

    const deletedUser = await UserService.deleteUser(id);

    if (!deletedUser) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};