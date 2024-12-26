const mongoose = require("mongoose")
exports.connectDatabase = async()=>{
    //Connecting to DataBase

    // Jaba samma database sanga connect hudaina wait gar vaneko (async - await le)
await mongoose.connect("mongodb+srv://root:root@cms.fsd5e.mongodb.net/?retryWrites=true&w=majority&appName=CMS")
console.log("Database connected successfully!")
}

// Current IP Address (27.34.68.88/32) added!