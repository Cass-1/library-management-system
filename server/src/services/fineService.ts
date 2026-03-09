import { Fine } from "@/models/Fine.js";
import { User } from "@/models/User.js";
import { Collection, DeleteResult, InsertOneResult, MongoServerError, ObjectId, WithId } from "mongodb";
//https://www.geeksforgeeks.org/mongodb/how-to-update-objects-in-a-documents-array-in-mongodb/
export class FineService {
    private repository;

    constructor(repository: Collection<User>) {
        this.repository = repository;
    }

    createFine = async (userId: string, fine: Fine): Promise<InsertOneResult<Document>> => {
        const checkResponse = await this.repository.findOne(
            { _id: new ObjectId(userId), "fines._id": fine._id }
        );
        if (checkResponse !== null) {
            throw new Error(`Fine with id: ${fine._id} already exists`);
        }
        const res = await this.repository.updateOne(
            { _id: new ObjectId(userId) },
            {
                $push: {
                    fines: fine
                }
            },
        );
        const success: boolean = res.matchedCount === 1 && res.modifiedCount === 1;
        return {
            acknowledged: res.acknowledged,
            ...(success) && { insertedId: fine._id }
        } as any;
    }

    deleteFine = async (userId: string, id: string): Promise<DeleteResult> => {
        const res = await this.repository.updateOne(
            { _id: new ObjectId(userId) },
            {
                $pull: {
                    fines: { _id: new ObjectId(id) }
                }
            }
        );
        return {
            acknowledged: res.acknowledged,
            deletedCount: res.modifiedCount
        }
    }

    getFine = async (userId: string, id: string): Promise<Fine | undefined> => {
        const user = await this.repository.findOne({ _id: new ObjectId(userId) });
        return user?.fines.find(x => x._id.equals(id));
    }

    getUserFines = async (userId: string): Promise<Fine[] | undefined> => {
        const user: WithId<User> | null = await this.repository.findOne({ _id: new ObjectId(userId) });
        return user?.fines;
    }
}