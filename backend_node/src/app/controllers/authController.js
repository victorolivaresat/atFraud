const Analyst = require('../models/Analyst');
const { createToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Analyst.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.pass);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await createToken({ userId: user.analystId });

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      id: user.analystId,
      name: user.name,
      email: user.email,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error during login" });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during logout" });
  }
};

// Verify Token
const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, "secret", async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await Analyst.findByPk(decodedToken.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        userId: user.analystId,
        name: user.name,
        email: user.email,
        message: "Authorized",
        success: true,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, logout, verifyToken };
