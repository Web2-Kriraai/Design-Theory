const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use Google DNS so MongoDB Atlas SRV records resolve correctly
// (the default local router DNS often doesn't support SRV lookups properly)
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000, // 15 sec to select a server
            socketTimeoutMS: 45000,
            connectTimeoutMS: 15000,
        });
        console.log(`✅  MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌  DB Connection Error:", error.message);
        console.log("⏳  Retrying connection in 5 seconds...");
        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB;