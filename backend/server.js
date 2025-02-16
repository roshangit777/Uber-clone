const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const connectDB = require("./db/connectdb");
const router = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const Maprouter = require("./routes/map.routes");
const RideRouter = require("./routes/ride.Routes");
const { initializeSocket } = require("./socket");
const app = express();
const port = process.env.PORT;
const mongoURL = process.env.MONGODB_URL;

app.use(express.urlencoded());
app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
const server = http.createServer(app);
initializeSocket(server);

app.use("/users/", router);
app.use("/captain/", captainRoutes);
app.use("/map/", Maprouter);
app.use("/rides", RideRouter);

app.get("/", (req, res) => {
  res.send("Hello word");
});

server.listen(port, () => {
  connectDB(mongoURL);
  console.log(`Server is running on http://localhost:${port}`);
});
