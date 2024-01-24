const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const CategoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path") ;

app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))
const Connection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("connected");
  } catch (err) {
    console.log("err:" + err);
  }
};

dotenv.config();
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(process.env.MONGO_URL, dbOptions)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"),(req, res)=>{
  console.log("request body:", req.body);
  console.log("request file:", req.file)
  res.status(200).json("file has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", CategoryRoute);

app.listen("5000", () => {
  console.log("Server running on port 5000");
});
