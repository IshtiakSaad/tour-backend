import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { User } from "./user.model";

/**
 * Service layer for user operations.
 * Handles DB logic, called from controllers.
 */

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(payload: Partial<IUser>): Promise<IUser> {
    const user = new User(payload);
    return await user.save();
  }

  /**
   * Get all users
   */
  static async getAllUsers(): Promise<IUser[]> {
    return await User.find({ isDeleted: { $ne: true } });
  }

  /**
   * Get a single user by ID
   */
  static async getUserById(userId: string | Types.ObjectId): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(userId)) return null;
    return await User.findById(userId).where({ isDeleted: { $ne: true } });
  }

  /**
   * Update a user
   */
  static async updateUser(
    userId: string | Types.ObjectId,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(userId)) return null;

    return await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true } // return updated document
    ).where({ isDeleted: { $ne: true } });
  }

  /**
   * Soft delete a user
   */
  static async deleteUser(userId: string | Types.ObjectId): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(userId)) return null;

    return await User.findByIdAndUpdate(
      userId,
      { $set: { isDeleted: true } },
      { new: true }
    );
  }
}