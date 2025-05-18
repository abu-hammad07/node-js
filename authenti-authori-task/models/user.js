const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/authtestapp`);

const userSchema = mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  token: { type: String, default: null },
  age: { type: Number, default: null },
  image: { type: String, default: null },
  role: { type: String, default: null },
  status: { type: String, default: null },
  address: { type: String, default: null },
  phone: { type: String, default: null },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("user", userSchema);
