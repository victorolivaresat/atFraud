const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { getPool } = require('../../config/database2');
const { createToken } = require("../utils/jwt");

// Middleware para verificar el JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Login handler
const login1 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('Email', sql.VarChar, email)
      .query('SELECT * FROM Analista WHERE usuario = @Email');

    const user = result.recordset[0];

    if (user && user.State === 'active') {
      const match = await bcrypt.compare(password, user.PasswordHash);
      if (match) {
        const token = jwt.sign({ id: user.UserID, email: user.Email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({
          success: true,
          authUser: user,
          token
        });
      } else {
        return res.status(401).json({ error: 'Las credenciales proporcionadas son incorrectas.' });
      }
    } else {
      return res.status(401).json({ error: 'El estado de tu cuenta no está activo.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
};

const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      //const user = await User.findOne({ where: { email } });
      const pool = await getPool();
      const result = await pool.request()
        .input('Email', sql.VarChar, email)
        .query('SELECT * FROM Analista WHERE usuario = @Email');
  
      const user = result.recordset[0];
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.pass);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = await createToken({ userId: user.idAnalista });
  
      res.cookie("token", token);
  
      res.status(200).json({
        message: "Logged in successfully",
        id: user.idAnalista,
        usuario: user.usuario,
        //firstName: user.firstName,
        //lastName: user.lastName,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "Error during login" });
    }
};

// Logout handler
const Logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error during logout" });
    }
};

const profile = async (req, res) => {
    try {
      // Verifica si req.userId está disponible
      if (!req.userId) {
        return res.status(400).json({ error: "User ID not found in request" });
      }
  
      // Obtén el pool de conexiones
      const pool = await getPool();
  
      // Realiza la consulta para obtener el usuario por su ID
      const result = await pool.request()
        .input('UserId', sql.Int, req.userId) // Ajusta el tipo según la definición de tu columna ID
        .query('SELECT * FROM Analista WHERE UserId = @UserId');
  
      // Obtén el primer usuario del conjunto de resultados
      const user = result.recordset[0];
  
      // Verifica si el usuario existe
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Devuelve la información del usuario excluyendo el campo de contraseña si existe
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error('Error retrieving user:', error);
      return res.status(500).json({ error: "Error retrieving user" });
    }
  };

  const verifyToken = async (req, res) => {
    try {
      // Obtén el token de las cookies
      const { token } = req.cookies;
  
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      // Verifica el token JWT
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }
  
        // Obtén el pool de conexiones
        const pool = await getPool();
  
        // Consulta para encontrar el usuario por su ID
        const result = await pool.request()
          .input('UserId', sql.Int, decodedToken.userId) // Ajusta el tipo según la definición de tu columna ID
          .query('SELECT * FROM Analista WHERE UserId = @UserId');
  
        // Obtén el primer usuario del conjunto de resultados
        const user = result.recordset[0];
  
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        // Devuelve la información del usuario
        res.json({
          userId: user.idAnalista,
          usuario: user.usuario,
          message: "Authorized",
          success: true,
        });
      });
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };



module.exports = { login1, Login, Logout, profile, verifyToken };
