const app = require("express")()
const mongoose = require("mongoose")
const { connectDatabase } = require("./database/database")

// DataBase connection function
connectDatabase()


// Get API -> /
app.get("/", (req, res)=>{
    res.json({
        status: 200,
        message: "I'm from home page."
    })
})








app.listen(3000, (req, res)=>{
    console.log("Project Successfully runs at 3000.")
})