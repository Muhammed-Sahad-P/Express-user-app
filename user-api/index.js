const express = require("express");
const path = require("path");
const connectDB = require("./db");
const User = require("./models/User");
const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.post("/users", async (req, res) => {
  const { name, email, username } = req.body;
  if (!name || !email || !username) {
    return res
      .status(400)
      .json({ message: "Name, email, and username are required" });
  }
  try {
    const newUser = new User({ name, email, username });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "server error occured" });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "server error occured" });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, username } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (username !== undefined) user.username = username;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "server error occured" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "server error occured" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
