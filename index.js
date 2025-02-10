require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/posts", postRoutes);

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error(err));
