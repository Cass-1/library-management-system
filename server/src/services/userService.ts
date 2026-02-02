import { User } from "@/models/User.js";
import { userCollection } from "@/util/db.js";
import { ObjectId } from "mongodb";

async function createUser(user: User) {
    return await userCollection.insertOne(user);
}

async function deleteUser(id: ObjectId) {
    return await userCollection.deleteOne({ _id: id });
}

async function getUser(id: ObjectId) {
    return await userCollection.findOne({ _id: id });
}

export {
    createUser,
    deleteUser,
    getUser
}