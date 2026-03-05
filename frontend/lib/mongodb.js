import { MongoClient } from "mongodb";
import dns from "dns";

// Force Google DNS so MongoDB Atlas SRV records resolve correctly
// (local router DNS does not support SRV lookups which +srv requires)
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error(
        "Please define the MONGODB_URI environment variable in .env.local"
    );
}

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    // Reuse client across hot-reloads in dev
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;