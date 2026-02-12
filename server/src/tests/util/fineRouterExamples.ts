import { Fine } from "@/models/Fine.js";
import { ObjectId } from "mongodb";

export const fineExampleUser = {
    "_id": new ObjectId(),
    "role": "member",
    "name": "GET Example",
    "age": 12.1,
    "enrollment_date": "2012-04-23T18:25:43.511Z",
    "fines": [],
    "books": [
        {
            "book_id": "1234",
            "title": "A Very Interesting Book",
            "author": "George Greggory"
        }
    ],
    "email": "me@site.com"
}

export const createExampleFine: Fine = {
    "total_cost": 1,
    "daily_rate": 1.1,
    "book_id": new ObjectId(),
    "_id": new ObjectId()
}

export const readExampleFine: Fine = {
    "total_cost": 2,
    "daily_rate": 1.1,
    "book_id": new ObjectId(),
    "_id": new ObjectId(),
}

export const updateExampleFine: Fine = {
    "total_cost": 3,
    "daily_rate": 1.1,
    "_id": new ObjectId(),
    "book_id": new ObjectId()
}

export const deleteExampleFine: Fine = {
    "total_cost": 4,
    "daily_rate": 1.1,
    "_id": new ObjectId(),
    "book_id": new ObjectId()
}