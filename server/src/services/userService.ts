import { User } from "@/models/User.js";
import { userCollection } from "@/util/db.js";
import { ObjectId } from "mongodb";

async function createUser(user: User) {
    return await userCollection.insertOne(user);
}

async function deleteUser(id: ObjectId) {
    return await userCollection.deleteOne({ _id: id });
}

async function getUser(id: ObjectId): Promise<User | null> {
    return await userCollection.findOne({ _id: id }) as User;
}

async function patchUser(id: ObjectId, data: Object) {
    const query = {
        "_id": id
    };
    const update = {
        "$set": {
            ...data
        }
    };
    return await userCollection.updateOne(query, update);
}

export {
    createUser,
    deleteUser,
    getUser,
    patchUser
}