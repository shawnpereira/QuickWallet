// const accountSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId, // Reference to User model
//     ref: "User",
//     required: true,
//   },
//   // Store the balance as an integer representing the INR value with decimal places
//   balance: {
//     type: Number,
//     required: true,
//     validate: {
//       validator: Number.isInteger, // Validate that the balance is an integer
//       message: '{VALUE} is not an integer value'
//     }
//   },
// });

// // Convert balance from rupees to paise (multiply by 100)
// accountSchema.pre('save', function(next) {
//   this.balance *= 100;
//   next();
// });

// // Convert balance from paise to rupees (divide by 100)
// accountSchema.post('findOne', function(doc) {
//   if (doc) {
//     doc.balance /= 100;
//   }
// });

// const Account = mongoose.model("Account", accountSchema);
// const User = mongoose.model("User", userSchema);

// module.exports = {
//   User,
//   Account,
// };
