import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

//This is to initialise the app where express works as a middleware
const app = express();
dotenv.config();

//here we are setting up the body parser so that they send the request properly
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//this is only work when ist is http://localhost:5000/posts
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Momories API");
});

//https://www.mongodb.com/cloud/atlas
// we are not connecting our data base with the app and using teh port 5000

//const CONNECTION_URL =
//  "mongodb+srv://satish:monika2018@testcluster1.dik1g.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
