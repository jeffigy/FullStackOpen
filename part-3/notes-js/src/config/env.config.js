require("dotenv/config");

const PORT = process.env.PORT ?? "3000";
const MONGODB_URI = process.env.MONGODB_URI ?? "3000";

module.exports = { PORT, MONGODB_URI };
