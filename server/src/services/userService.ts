import { User } from "@/models/User.js";
import { userCollection } from "@/util/db.js";
import { ObjectId } from "mongodb";

async function createUser(user: User) {
    // ensure user id is object
    user._id = new ObjectId(user._id);
    return await userCollection.insertOne(user);
}

async function deleteUser(id: string) {
    const objId = new ObjectId(id);
    return await userCollection.deleteOne({ _id: objId });
}

async function getUser(id: string): Promise<User | null> {
    const objId = new ObjectId(id);
    return await userCollection.findOne({ _id: objId }) as User;
}

async function patchUser(id: string, data: Object) {
    const objId = new ObjectId(id);
    const query = {
        "_id": objId
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