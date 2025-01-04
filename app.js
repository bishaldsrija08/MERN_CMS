const mongoose = require("mongoose");
const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");
const cors = require("cors");

//Using Express
const express = require("express");
const app = express();

//Cross-origin resource sharing (CORS) is a mechanism that allows a web page to access resources from a different domain than the one that served the page.
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//Form bata ako data buj vaneko talako linele
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DataBase connection function
connectDatabase();

// Get API -> /
app.get("/", (req, res) => {
  res.status(200).json({
    // status: 200,
    message: "I'm from home page.",
  });
});

// Get API -> Get all blogs
app.get("/blogs", async (req, res) => {
  //fetching/reading all blogs from blog model
  const blogs = await Blog.find(); //findle arrayma data return garxa - array vitra object auxa
  // check if blogs contains data or not
  if (blogs.length == 0) {
    res.status(404).json({
      // status: 404,
      message: "There's no blogs to show!",
    });
  } else {
    res.status(200).json({
      // sttus: 200,
      message: "All blogs fetch successfully!",
      blogs: blogs,
    });
  }
});

//Get API -> single blogs: blogs/:id
app.get("/blogs/:id", async (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id;
  //const{id} = req.params => Alternative
  const blog = await Blog.find({ _id: id });
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
  if (blog.length == 0) {
    res.status(404).json({
      // status: 404,
      message: "No blogs found! Please try correct URL",
    });
  } else {
    res.status(200).json({
      // status: 200,
      message: "Blog fetch successfylly!",
      blog: blog,
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

  res.status(201).json({
    // status: 200,
    message: "Blog created successfully",
  });

  //Alternative
  // res.status(200).json({
  //     message: "Blog created sucessfully!"
  // })
});

//Update Blog API
app.patch("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description;

  await Blog.findByIdAndUpdate(id, {
    title: title,
    subTitle: subTitle,
    description: description,
  });
  res.status(200).json({
    // status: 200,
    message: "Blog updated successfully",
  });
});

//Delete Blog API
app.delete("/blogs/:id", async (req, res) => {
  const id = req.params.id;

  await Blog.findByIdAndDelete(id);
  res.status(200).json({
    // status: 200,
    message: "Blog Deleted successfully",
  });
});

app.listen(3000, (req, res) => {
  console.log("Project Successfully runs at 3000.");
});