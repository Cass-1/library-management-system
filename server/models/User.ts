import { Fine } from "@models/Fine.js";
import { BookMetadata } from "@models/BookMetadata.js";

export enum UserRole {
    Member = "MEMBER",
    Staff = "STAFF",
    LibraryManager = "LIBRARY_MANAGER",
    Admin = "ADMIN"
}
export interface User {
    role: UserRole,
    name: string,
    age: number,
    enrollment_date: string,
    fines: Fine[],
    books: BookMetadata[],
    email: string
}