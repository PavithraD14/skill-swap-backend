const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dbConnection = require("./config/dbConnection.config");
const authenticationRoutes = require("./routes/authentication.routes");
const skillRoutes = require("./routes/skill.routes");
const swapRequestRoutes = require("./routes/swapRequest.routes");
const userRoutes = require("./routes/user.routes");

app.use(cors());
 

app.use(express.json());
app.use("/auth", authenticationRoutes);
app.use("/skills", skillRoutes);
app.use("/swap-requests", swapRequestRoutes);
app.use("/users", userRoutes);
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


dbConnection();
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`);
});