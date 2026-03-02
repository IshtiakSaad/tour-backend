import { z } from "zod";
import { Types } from "mongoose";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}^~#<>]).{8,}$/;

// Zod schema for auth provider
const authProviderSchema = z.object({
  provider: z.string().min(2, "Provider name is too short"),
  providerId: z.string().min(2, "Provider ID is too short"),
});

// Zod schema for create user
export const createUserValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long"),

    email: z.string().email("Invalid email format"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password is too long")
      .regex(
        passwordRegex,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      )
      .optional(),

    phone: z
      .string()
      .min(5, "Phone number is too short")
      .max(20, "Phone number is too long")
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "only valid of Bangladeshi phone number format. ",
      })
      .optional(),

    picture: z.string().url("Picture must be a valid URL").optional(),
    address: z.string().max(200, "Address is too long").optional(),

    isDeleted: z.boolean().optional(),

    isActive: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]).optional(),

    isVerified: z.boolean().optional(),

    role: z.enum(["SUPER_ADMIN", "ADMIN", "USER", "GUIDE"]).optional(),

    auths: z.array(authProviderSchema).optional(),

    bookings: z
      .array(
        z
          .string()
          .refine((val) => Types.ObjectId.isValid(val), "Invalid booking ID"),
      )
      .optional(),
    guides: z
      .array(
        z
          .string()
          .refine((val) => Types.ObjectId.isValid(val), "Invalid guide ID"),
      )
      .optional(),
  }),
});

// Partial version for update
export const updateUserValidation = z.object({
  body: createUserValidation.shape.body.partial(),
});

export const UserValidations = {
  createUserValidation,
  updateUserValidation,
};
