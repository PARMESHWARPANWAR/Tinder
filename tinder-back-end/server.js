import express from "express";
import mongoose from "mongoose";

import Cards from "./dbCards.js";
import Cors from "cors";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const MONGODB_URI = "mongodb://127.0.0.1/tinderdb";

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello world"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log(`listening on localhost: ${port}`));
