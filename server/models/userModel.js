// IMPORT MONGOOSE TO CREATE USER MODEL
const mongoose = require("mongoose");

// IMPORT BCRYPT
const bcrypt = require("bcryptjs");

// Use mongoose to create userSchema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Each user must have a name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is a required field"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [3, "Password must be at least 3 characters long"],
      required: [true, "Password is a required field"],
      select: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Create a document middleware to encrypt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // Call the next middleware in the stack
    next();

    // Return early
    return;
  }

  // Encrypt password
  this.password = await bcrypt.hash(this.password, 12);

  // Call the next middleware in the stack
  next();
});

// Use mongoose and schema to create user model
const User = mongoose.model("User", userSchema);

// EXPORT MODEL TO BE USED IN OTHER PARTS OF OUR APPLICATION
module.exports = User;




// // IMPORT MONGOOSE TO CREATE USER MODEL
// const mongoose = require("mongoose");

// // IMPORT BCRYPT
// const bcrypt = require("bcryptjs");

// // Use mongoose to create userSchema
// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Each user must have a name"],
//     },
//     email: {
//       type: String,
//       trim: true,
//       required: [true, "Email is a required field"],
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       trim: true,
//       minLength: [3, "Password must be at least 3 characters long"],
//       required: [true, "Password is a required field"],
//       select: false,
//     },
//   },
//   {
//     timestamps: true,
//     toObject: { virtuals: true },
//     toJSON: { virtuals: true },
//   }
// );

// // Create a document middleware to encrypt the password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     // Call the next middleware in the stack
//     next();

//     // Return early
//     return;
//   }

//   // Encrypt password
//   this.password = await bcrypt.hash(this.password, 12);

//   // Call the next middleware in the stack
//   next();
// });

// // Use mongoose and schema to create user model
// const User = mongoose.model("User", userSchema);

// // EXPORT MODEL TO BE USED IN OTHER PARTS OF OUR APPLICATION
// module.exports = User;





// // const mongoose = require('mongoose');
// // const Schema = mongoose.Schema;
// // const bcrypt = require('bcrypt');

// // const SALT_ROUNDS = 6;  // 6 is a reasonable value

// // const userSchema = new Schema({
// //   name: { type: String, required: true },
// //   email: {
// //     type: String,
// //     unique: true,
// //     trim: true,
// //     lowercase: true,
// //     required: true
// //   },
// //   password: {
// //     type: String,
// //     trim: true,
// //     minLength: 3,
// //     required: true
// //   }
// // }, {
// //   timestamps: true,
// //   // Even though it's hashed - don't serialize the password
// //   toJSON: {
// //     transform: function (doc, ret) {
// //       delete ret.password;
// //       return ret;
// //     }
// //   }
// // });

// // userSchema.pre('save', async function(next) {
// //   // 'this' is the user doc
// //   if (!this.isModified('password')) return next();
// //   // update the password with the computed hash
// //   this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
// //   return next();
// // });

// // module.exports = mongoose.model('User', userSchema);