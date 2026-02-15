import { Fine } from "@/models/Fine.js";
import { ObjectId } from "mongodb";



export const readExampleFine: Fine = {
    "daily_rate": 1.1,
    "book_id": new ObjectId(),
    "_id": new ObjectId(),
    "dateIssued": new Date()
}

export const updateExampleFine: Fine = {
    "daily_rate": 1.1,
    "_id": new ObjectId(),
    "book_id": new ObjectId(),
    "dateIssued": new Date()
}

export const deleteExampleFine: Fine = {
    "daily_rate": 1.1,
    "_id": new ObjectId(),
    "book_id": new ObjectId(),
    "dateIssued": new Date()
}