import { User, UserRole } from "@/models/User.js";
import { ObjectId } from "mongodb";

export const EXAMPLE_USER = new User(UserRole.Member, "Alice", 12, new Date(), [], [], "email@email", new ObjectId());
export const DELETE_RESPONSE = { "acknowledged": true, "deletedCount": 1 };
