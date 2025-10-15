const express = require("express");
const cors = require("cors");
const planRoute = require("./routes/plan");

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // React frontend
app.use(express.json());
app.use("/plan", planRoute);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
