const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../model/schema"); // get from mongo file {} as it is a object
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const { Account } = require("../model/schema");
//
const { authMiddleware } = require("../middleware/middleware");
//define the zod auth
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
//
//Start checking if above validation is true
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  //
  //Check if same entry exists or not in the User database
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    //if yes, then return
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  //

  //
  //If everything above is clear, then...
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword, // Store the hashed password
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  //
  //
  const userId = user._id; // take the user ID for generating a jwt token
  //
  //Give dummy balance to the user
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  // generate jwt token
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET //mix it with the secret token of database
  );
  //
  res.json({
    message: "User created successfully",
    token: token,
  });
  //
});
//
//
//Now we move to sign in...
//
//
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
//
router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  //
  const user = await User.findOne({
    username: req.body.username,
  });
  //
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  //
  // Compare hashed password with provided password
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  //
  // If password matches, generate and return JWT token
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  //
  res.json({
    token: token,
  });
});
//
//Update request
//
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});
//
//Get request
//
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
