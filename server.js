const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Color = require("./models/Color");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/randomcolors")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// Generate and save color
app.get("/api/color", async (req, res) => {
  try {
    const randomColor = generateRandomColor();

    const savedColor = await Color.create({
      color: randomColor
    });

    res.json(savedColor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all generated colors
app.get("/api/colors", async (req, res) => {
  const colors = await Color.find().sort({ createdAt: -1 });
  res.json(colors);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});