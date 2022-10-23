// IMPORT JSON WEBTOKEN TO ASSIST WITH TOKEN
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

// IMPORT USER TO MANIPULATE DATA ON THE DATABASE LEVEL
const User = require("./../../models/userModel");

// Define a route handler for creating users
exports.createUser = async (request, response) => {
  try {
    // Create new user
    const newUser = await User.create({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    });

    // Remove password from output
    newUser.password = undefined;

    // Create token
    const token = await jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION_DATE,
      }
    );

    // Send JSON RESPONSE
    response.status(201).json({
      status: "success",
      data: {
        newUser,
        token,
      },
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      error: error,
    });
  }
};


/*
const passwordEnteredByUser = "mypass123"
const hash = "$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K"

bcrypt.compare(passwordEnteredByUser, hash, function(error, isMatch) {
  if (error) {
    throw error
  } else if (!isMatch) {
    console.log("Password doesn't match!")
  } else {
    console.log("Password matches!")
  }
})
*/
exports.login = async (req, res) => {
  try {
    console.log(`controller, login: ${req.body.email}`)
    // isn't this going to let me in with the wrong pwd? yes
    // because i don't know how to decrypt or whatnot
    const user = await User.findOne({ email: req.body.email}); //, password: bcrypt.hash(req.body.password, 12)
    console.log(`user: ${JSON.stringify(user)}`);
    console.log(`passrod: ${user.password}`);


    // this method will not work if select: false is set on the model's password field.
    // I can't currently understand how the comparePassword mongo method works (and it doesn't)
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log(`they match, says compare`);
    }
    else {
      console.log("they not match. says compare")
    }

    // const isMatch = user.comparePassword(req.body.password, (matchError, isMatch) => {
    //   if (matchError) console.log("comparePassword error in userController")
    //   else if (!isMatch) console.log("Passwords do not match");
    //   else console.log(`it matched!`)
    // });
    // console.log(`isMatch: ${isMatch}`)
    // if (!isMatch) console.log("Passwords do not match");

    
    if (user === null) return res.status(401).json({ unauthorized: true })
    // const token = createJWT(user);
    console.log(`still alive`)
    const token = await jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION_DATE,
      }
    );
    console.log(`still alive with token: ${token}`)

    res.status(201).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(`error: ${error}`)
    res.status(400).json(error);
  }
}


// Define a route handler for retrieving the a single user
exports.getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);

    // Assuming no user if found with that id
    if (!user) {
      throw new Error("No user found with that id");
    }

    // Send response
    response.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    response.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};



exports.getUsers = async (request, response) => {
  try {
    const users = await User.find();

    // Assuming no user if found with that id
    if (!users) {
      throw new Error("No users found");
    }

    // Send response
    response.status(200).json({
      status: "success",
      data: {
        users
      },
    });
  } catch (error) {
    response.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};




// // IMPORT JSON WEBTOKEN TO ASSIST WITH TOKEN
// const jwt = require("jsonwebtoken");

// // IMPORT USER TO MANIPULATE DATA ON THE DATABASE LEVEL
// const User = require("../../models/userModel");

// exports.getUsers = async (req, res) => {
//   res.send('get / got')
// }

// // Define a route handler for creating users
// exports.createUser = async (request, response) => {
//   try {
//     console.log(`controller createUser`)
//     // console.log(`createUser: ${request.body.name}`);
//     // Create new user
//     const newUser = await User.create({
//       name: request.body.name,
//       email: request.body.email,
//       password: request.body.password,
//     });

//     console.log(`User.create passed`);

//     // Remove password from output
//     newUser.password = undefined;

//     // Create token
//     const token = await jwt.sign(
//       { id: newUser._id },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: process.env.JWT_EXPIRATION_DATE,
//       }
//     );

//     // Send JSON RESPONSE
//     response.status(201).json({
//       status: "success",
//       data: {
//         newUser,
//         token,
//       },
//     });
//   } catch (error) {
//     console.log(`error: ${error}`)
//     response.status(500).json({
//       status: "error",
//       error: error,
//     });
//   }
// };

// // Define a route handler for retrieving the a single user
// exports.getUser = async (request, response) => {
//   try {
//     const user = await User.findById(request.params.id);

//     // Assuming no user if found with that id
//     if (!user) {
//       throw new Error("No user found with that id");
//     }

//     // Send response
//     response.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     response.status(404).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };





// // const User = require('../models/user')
// // const jwt = require('jsonwebtoken')

// // async function create(req, res) {

// //   try {
// //     const user = await User.create(req.body);
// //     const token = createJWT(user);
// //     res.json(token);
// //   } catch (err) {
// //     res.status(400).json(err);
// //   }
// // }

// // async function login(req, res) {
// //   try {
// //     const user = await User.findOne({email: req.body.email});
// //     console.log(`user: ${JSON.stringify(user)}`);
// //     if (user === null) return res.status(401).json({unauthorized: true})
// //     const token = createJWT(user);
// //     res.json(token);
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }
// // }

// // function createJWT(user) {
// //   return jwt.sign(
// //     // data payload
// //     { user },
// //     process.env.ACCESS_TOKEN_SECRET,
// //     { expiresIn: '24h' }
// //   );
// // }

// // function checkToken(req, res) {
// //   // req.user will always be there for you when a token is sent
// //   console.log('req.user', req.user);
// //   res.json(req.exp);
// // }

// // module.exports = {
// //   create,
// //   login,
// //   createJWT,
// //   checkToken
// // };