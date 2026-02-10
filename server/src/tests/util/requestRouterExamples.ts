import { Book, BookType } from "@/models/Book.js"
import { BookRequest } from "@/models/BookRequest.js";
import { ObjectId } from "mongodb"

export const requestExampleBook = new Book(new ObjectId(), "1234", "Request Example Book", "somebody", "textbook", BookType.PRINT, "", "", true);
const userId = new ObjectId();
export const createExampleRequest = new BookRequest(requestExampleBook._id, userId, new Date(), new Date(2), true);
export const readExampleRequest = new BookRequest(requestExampleBook._id, userId, new Date(), new Date(2), true);
export const deleteExampleRequest = new BookRequest(requestExampleBook._id, userId, new Date(), new Date(2), true);