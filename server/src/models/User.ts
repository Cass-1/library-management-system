import { Fine } from "@models/Fine.js";
import { BookMetadata } from "@models/BookMetadata.js";
import { ObjectId } from "mongodb";

export enum UserRole {
    Member = "MEMBER",
    Staff = "STAFF",
    LibraryManager = "LIBRARY_MANAGER",
    Admin = "ADMIN"
}
export class User {
    _id?: ObjectId;
    role: UserRole;
    name: string;
    age: number;
    enrollment_date: Date;
    fines: Fine[];
    books: BookMetadata[];
    email: string;

    constructor(role: UserRole, name: string, age: number, enrollment_date: Date, fines: Fine[], books: BookMetadata[], email: string, _id?: ObjectId) {
        this.role = role
        this.name = name
        this.age = age
        this.enrollment_date = enrollment_date
        this.fines = fines
        this.books = books
        this.email = email
        this._id = _id;
    }
}