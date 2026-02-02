import { User } from "@/models/User.js";
import { userCollection } from "./db.js";

export class DataAccessLayer {
    public async GetUser(id: any) {
        return await userCollection.findOne({ _id: id });
    }

    public async DeleteUser(id: any) {
        return await userCollection.deleteOne({ _id: id });
    }
    public async CreateUser(user: User) {
        return await userCollection.insertOne(user);
    }
}