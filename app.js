const mongoose = require("mongoose");
const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");

const express = require("express");
const app = express();

//Form bata ako data buj vaneko talako linele
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DataBase connection function
connectDatabase();

// Get API -> /
app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "I'm from home page.",
    });
});

//Create blog API
app.post("/create", async (req, res) => {
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const description = req.body.description;
    // Inserting to database logic goes here
    await Blog.create({
        //req.body vaneko frontendle pathako data ho
        title: title,
        subTitle: subTitle,
        description: description,
    });

    res.json({
        status: 201,
        message: "Blog created successfully",
    });

    //Alternative
    // res.status(200).json({
    //     message: "Blog created sucessfully!"
    // })
});

app.listen(3000, (req, res) => {
    console.log("Project Successfully runs at 3000.");
});