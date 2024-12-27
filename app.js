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

// Get API -> Get all blogs
app.get("/blogs", async (req, res) => {
  //fetching/reading all blogs from blog model
  const blogs = await Blog.find(); //findle arrayma data return garxa - array vitra object auxa
  // check if blogs contains data or not
  if (blogs.length == 0) {
    res.json({
      status: 404,
      message: "There's no blogs to show!",
    });
  } else {
    res.json({
      status: 201,
      message: "All blogs fetch successfully!",
      data: blogs,
    });
  }
});

//Get API -> single blogs: blogs/:id
app.get("/blogs/:id", async (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id;
  //const{id} = req.params => Alternative
  const blogs = await Blog.find({ _id: id });
  // Alternative
  //   const blogs = await Blog.findById(id) //FindById returns data in the form of object.
  //   if(blogs){
  //     res.json({
  //         status: 201,
  //       message: "Blog fetch successfylly!",
  //       data: blogs,
  //     })
  //   }else{
  //     res.json({
  //         status: 404,
  //         message: "No blogs found! Please try correct URL",
  //       });
  //   }
  if (blogs.length == 0) {
    res.json({
      status: 404,
      message: "No blogs found! Please try correct URL",
    });
  } else {
    res.json({
      status: 201,
      message: "Blog fetch successfylly!",
      data: blogs,
    });
  }
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