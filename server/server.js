require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ejs = require("ejs");

const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const unprotectRoutes = require("./routes/Upprotectedroutes");
const UserRoutes = require("./routes/UserRoutes");
const offerRoutes = require("./routes/OffersRoute");
const itemsRoutes = require("./routes/itemsRoutes");

const VendorsRoutes = require("./routes/vendorsRoutes");

const ProductRoutes = require("./routes/ProductRoutes");
const OrdersRoutes = require("./routes/OrdersRoutes");
const refreshTokenRoutes = require("./routes/refreshToken");

const verifyJWT = require("./middlewares/verifyJWT");

const app = express();

// Middleware setup
app.use(
  cors({
    origin: [
      "https://sellercenter.cinab.co.ke",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Put here unprotected routes
app.use("/v2", UserRoutes);
app.use("/v2", unprotectRoutes);
app.use("/v2", VendorsRoutes);
app.use("/v2", offerRoutes);
app.use("/v2", refreshTokenRoutes);

// put here product routes
app.use("/v2", OrdersRoutes);
app.use("/v2", itemsRoutes);

//orders routes

// Enter All protected routes Below VerifyJWT
app.use(verifyJWT);
app.use("/v2", ProductRoutes);

const port = process.env.PORT || 5000;

// Socket.IO setup
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "https://sellercenter.cinab.co.ke/",
      "https://server.cinab.co.ke/",
    ],
    credentials: true,
  },
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
