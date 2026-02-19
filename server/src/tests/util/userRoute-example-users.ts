import { User, UserRole } from "@/models/User.js";
import { ObjectId } from "mongodb"
const GETExampleUserId = new ObjectId();
const POSTExampleUserId = new ObjectId();
const DELETEExampleUserId = new ObjectId();
const PATCHExampleUserId = new ObjectId();

const GETExampleUser: User = {
    "_id": GETExampleUserId,
    "role": UserRole.LibraryManager,
    "name": "GET Example",
    "age": 12.1,
    "enrollment_date": new Date(),
    "fines": [
        {
            "_id": new ObjectId(),
            "daily_rate": 1.1,
            "book_id": new ObjectId(),
            "dateIssued": new Date()
        }
    ],
    "books": [
        {
            "book_id": "1234",
            "title": "A Very Interesting Book",
            "author": "George Greggory"
        }
    ],
    "email": "me@site.com"
}

const POSTExampleUser: User = {
    "_id": POSTExampleUserId,
    "role": UserRole.LibraryManager,
    "name": "POST Example",
    "age": 12.1,
    "enrollment_date": new Date(),
    "fines": [
        {
            "_id": new ObjectId(),
            "daily_rate": 1.1,
            "book_id": new ObjectId(),
            "dateIssued": new Date()
        }
    ],
    "books": [
        {
            "book_id": "1234",
            "title": "A Very Interesting Book",
            "author": "George Greggory"
        }
    ],
    "email": "me@site.com"
}

const DELETEExampleUser: User = {
    "_id": DELETEExampleUserId,
    "role": UserRole.LibraryManager,
    "name": "DELETE Example",
    "age": 12.1,
    "enrollment_date": new Date(),
    "fines": [
        {
            "_id": new ObjectId(),
            "daily_rate": 1.1,
            "book_id": new ObjectId(),
            "dateIssued": new Date()
        }
    ],
    "books": [
        {
            "book_id": "1234",
            "title": "A Very Interesting Book",
            "author": "George Greggory"
        }
    ],
    "email": "me@site.com"
}

const PATCHExampleUser: User = {
    "_id": PATCHExampleUserId,
    "role": UserRole.Admin,
    "name": "PATCH Example",
    "age": 12.1,
    "enrollment_date": new Date(),
    "fines": [
        {
            "_id": new ObjectId(),
            "daily_rate": 1.1,
            "book_id": new ObjectId(),
            "dateIssued": new Date()
        }
    ],
    "books": [
        {
            "book_id": "1234",
            "title": "A Very Interesting Book",
            "author": "George Greggory"
        }
    ],
    "email": "me@site.com"
}

export {
    GETExampleUser,
    POSTExampleUser,
    DELETEExampleUser,
    PATCHExampleUser
}