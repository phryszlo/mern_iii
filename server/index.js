
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');



// const favicon = require("serve-favicon");
// const path = require("path");

const userRouter = require("./routes/api/users");
const deepartRouter = require("./routes/api/deepart");
// const userRouter = require("./controllers/api/userController");

require("dotenv").config();
const PORT = process.env.PORT; // || 5050;
const app = express();

// hey self-person, cors() is a function <<<
app.use(cors());  
console.log(`dirname = ${path.join(__dirname , '/public')}`);
app.use(express.static(path.join(__dirname , '/public')));


const DB = mongoose
  .connect(
    process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTION SUCCESSFUL!");
  });

  // app.use(morgan("dev"));
  // app.use(express.json({ limit: '50MB' }));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  
  app.use("/api/users", userRouter);
  app.use("/api/deepart", deepartRouter);

  app.all("*", (request, response) => {
    response.send("Undefined route");
  });

app.listen(PORT, () => console.log(`server on port ${PORT}`));




  // this section copied from jwt1 authServer.js
// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
// }

// app.post('/login', (req, res) => {
//   const username = req.body.username
//   const user = { name: username }

//   const accessToken = generateAccessToken(user)
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//   refreshTokens.push(refreshToken)
//   res.json({ accessToken: accessToken, refreshToken: refreshToken })
// })

// let refreshTokens = []

// app.post('/token', (req, res) => {
//   const refreshToken = req.body.token
//   if (refreshToken == null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = generateAccessToken({ name: user.name })
//     res.json({accessToken: accessToken})
//   })
// })

// app.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })
  // ^^^ section copied from jwt1 authServer.js


