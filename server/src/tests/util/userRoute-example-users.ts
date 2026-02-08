import { ObjectId } from "mongodb"
const GETExampleUserId = new ObjectId();
const POSTExampleUserId = new ObjectId();
const DELETEExampleUserId = new ObjectId();
const PATCHExampleUserId = new ObjectId();

const GETExampleUser = {
    "_id": GETExampleUserId,
    "role": "member",
    "name": "GET Example",
    "age": 12.1,
    "enrollment_date": "2012-04-23T18:25:43.511Z",
    "fines": [
        {
            "total_cost": 10.1,
            "daily_rate": 1.1,
            "book_id": "1234"
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

const POSTExampleUser = {
    "_id": POSTExampleUserId,
    "role": "member",
    "name": "POST Example",
    "age": 12.1,
    "enrollment_date": "2012-04-23T18:25:43.511Z",
    "fines": [
        {
            "total_cost": 10.1,
            "daily_rate": 1.1,
            "book_id": "1234"
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

const DELETEExampleUser = {
    "_id": DELETEExampleUserId,
    "role": "member",
    "name": "DELETE Example",
    "age": 12.1,
    "enrollment_date": "2012-04-23T18:25:43.511Z",
    "fines": [
        {
            "total_cost": 10.1,
            "daily_rate": 1.1,
            "book_id": "1234"
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

const PATCHExampleUser = {
    "_id": PATCHExampleUserId,
    "role": "member",
    "name": "PATCH Example",
    "age": 12.1,
    "enrollment_date": "2012-04-23T18:25:43.511Z",
    "fines": [
        {
            "total_cost": 10.1,
            "daily_rate": 1.1,
            "book_id": "1234"
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