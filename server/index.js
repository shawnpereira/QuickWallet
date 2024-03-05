const express = require("express");
const app = express();
const cors = require("cors");
//
//The order does matter as the order should go from middleware before going towards the routes
//
app.use(cors());
app.use(express.json());

const rootRouter = require("./routes/index"); // Define rootRouter here
app.use("/api/v1", rootRouter); // Attach rootRouter to the '/api/v1' path

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
