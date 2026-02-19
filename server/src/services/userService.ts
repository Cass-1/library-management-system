import { User } from "@/models/User.js";
import { Collection, ObjectId } from "mongodb";

export class UserService {
    private repository;

    constructor(repository: Collection<User>) {
        this.repository = repository;
    }

    createUser = async (user: User) => {
        return await this.repository.insertOne(user);
    }

    deleteUser = async (id: string) => {
        const objId = new ObjectId(id);
        return await this.repository.deleteOne({ _id: objId });
    }

    getUser = async (id: string): Promise<User | null> => {
        const objId = new ObjectId(id);
        return await this.repository.findOne({ _id: objId }) as User;
    }

    patchUser = async (id: string, data: Object) => {
        const objId = new ObjectId(id);
        const query = {
            "_id": objId
        };
        const update = {
            "$set": {
                ...data
            }
        };
        return await this.repository.updateOne(query, update);
    }
}
