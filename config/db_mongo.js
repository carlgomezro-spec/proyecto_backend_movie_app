const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado a MongoDB Atlas - Proyecto Movie App");
    } catch (err) {
        console.error("Error de conexión:", err);
    }
}

module.exports = connectDB;