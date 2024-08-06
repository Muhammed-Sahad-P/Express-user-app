const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname)));

let users = [];

app.post("/users", (req, res) => {
  const { name, email, username } = req.body;
  if (!name || !email || !username) {
    return res
      .status(400)
      .json({ message: "Name, email, and username are required" });
  }
  const id = users.length + 1;
  const newUser = { id, name, email, username };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, username } = req.body;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (username !== undefined) user.username = username;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
