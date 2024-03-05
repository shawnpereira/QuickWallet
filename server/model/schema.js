const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ShawnSource:make12345sp@source.qzqbsmt.mongodb.net/paytm"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a Schema for Users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

///Created schema for storing banking details
// point to be noted..
// In the real world, we shouldn’t store `floats` for balances in the database.
// we usually store an integer which represents the INR value with
// decimal places (for eg, if someone has 33.33 rs in their account,
// you store 3333 in the database).
// There is a certain precision that you need to support (which for india is
// 2/4 decimal places) and this allows you to get rid of precision errors by storing integers in your DB
//this IRL we can only send our friend 99.24 or 99 and not 99.234 or so on.
// in db it will be stored as 9924
//Have created another file named inrSchema just to understand how the code is written, however it is not implemented right now..
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model as we know id of user will always come from User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
};
