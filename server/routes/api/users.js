// IMPORT EXPRESS IN ORDER TO CREATE ROUTERS
const express = require("express");

// IMPORT USER CONTROLLER
const userController = require("../../controllers/api/userController");

// Use express to create a router
const router = express.Router();

router.route("/").get(userController.getUsers)
// Use the router to redirect to different controller depending on the method
router.route("/").post(userController.createUser);
router.route("/:id").get(userController.getUser);

// EXPORT ROUTER TO BE USED IN OTHER PARTS OF OUR APPLICATION
module.exports = router;



// // IMPORT EXPRESS IN ORDER TO CREATE ROUTERS
// const express = require("express");

// // IMPORT USER CONTROLLER
// const userController = require("../../controllers/api/userController");

// // Use express to create a router
// const router = express.Router();

// // Use the router to redirect to different controller depending on the method
// // router.route("/").get(userController.getUsers)
// router.route("/").post(
//   (req, res) => {
//     console.log(`post route hit`)
//     userController.createUser
//   }
// );
// router.route("/:id").get(
//   userController.getUser
// );

// // EXPORT ROUTER TO BE USED IN OTHER PARTS OF OUR APPLICATION
// module.exports = router;