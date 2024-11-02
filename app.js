const express = require("express");
const morgan = require("morgan");
const app = express();
const dbConnection = require("./config/db");
const userModel = require("./models/user");

app.use(morgan("dev"));

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// app.use((req,res,next)=>{   //This middleware is used or all routes but we can set it for specific routes also
//     console.log("Here is middelWare!")
//     const a=5;
//     const b=3;

//     const c= a+b
//     console.log("Middleware Answer: ",c)
//     return next()
// })

// app.get("/",(req,res, next)=>{ //This middleware is used for specific route
//         const a=5;
//         const b=2;

//         const c= a+b
//         console.log("Middleware Answer: ",c)
//         return next()
// } ,(req,res)=>{
//     // res.send("Hello Get Index")
//     res.render("home")
// })

app.get("/", (req, res) => {
  //It is Html Home Page
  // res.send("Hello Get Index")
  res.render("home");
});

app.get("/about", (req, res) => {
  res.send("Hello Get About");
});
app.get("/register", (req, res) => {
  //It is Html page to send data for post request
  res.render("register");
});

app.post("/registerUser", async (req, res) => {
  //CRUD 'C' is covered
  console.log("userdata: ", req.body);
  const { username, email, password } = req.body;
  const newUser = await userModel.create({
    username: username,
    email: email,
    password: password,
  });
  res.send(newUser);
});

app.get("/getallusers", async (req, res) => {
  await userModel.find().then((users) => {
    //CRUD 'R' is covered to fech all users
    res.send(users);
  });
});

app.get("/getSingleUser", async (req, res) => {
  //find() method returns us the array of objects and for single entry only object returns, if not found then empty array
  await userModel
    .find({
      email: "kp@gmail.com", //CRUD 'R' is covered to fetch single user based on condition from all users
    })
    .then((users) => {
      res.send(users);
    });
});

app.get("/getSingleUserbyfindOne", async (req, res) => {
  await userModel
    .findOne({
      email: "kp@gmail.com", //CRUD 'R' is covered to fetch single user based on condition from all users
    })
    .then((users) => {
      res.send(users);
    });
});

app.get("/updateUser", async (req, res) => {
  await userModel.findOneAndUpdate(
    {
      username: "naveed",
    },
    {
      email: "naveedPk@gmail.com",
    }
  );

  res.send("User Updated!");
});

app.get("/deleteUser", async (req, res) => {
  await userModel.findOneAndDelete({ username: "kp" });
  res.send("User Deleted!")
});

app.post("/get-form-data", (req, res) => {
  // This is used for (home.ejs) to make understanding and working with static files such as (images,css, javascript) files
  console.log(req.body);
  res.send("Data Sent!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
