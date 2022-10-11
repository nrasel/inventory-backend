const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middlewares
app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name of this product"],
    unique: [true, "Name must be unique"],
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [100, "Name is too large"],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price can be negative"],
  },
  unit: {
    type: String,
    required: true,
    enum: {
      value: ["kg", "litre", "pcs"],
      message: "unit value can't be {VALUE}, must be kg/litre/pcs",
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "quantity can be negative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          false;
        }
      },
      message: "Quantity must be an integer",
    },
  },
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
