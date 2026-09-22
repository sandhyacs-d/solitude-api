import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

export async function connectTestDb(){
    mongoServer = await MongoMemoryServer.create();

    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
}

export async function disconnectTestDB() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
}



