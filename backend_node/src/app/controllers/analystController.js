const Analyst = require('../models/Analyst');
const bcrypt = require("bcrypt");

// Crear un nuevo Analyst
const createAnalyst = async (req, res) => {
  try {
    const { name, email, pass, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(pass, 10);

    const analyst = await Analyst.create({
      name,
      email,
      pass: hashedPassword,
      ...rest
    });

    res.status(201).json({
      message: "Analyst created successfully",
      analyst
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating analyst", message: error.message });
  }
};

// Obtener un Analyst por ID
const getAnalyst = async (req, res) => {
  try {
    const analyst = await Analyst.findByPk(req.params.id, {
      attributes: { exclude: ["pass"] }, // Excluye la contraseña de la respuesta
    });

    if (!analyst) {
      return res.status(404).json({ error: "Analyst not found" });
    }

    res.status(200).json(analyst);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving analyst" });
  }
};

// Obtener todos los Analysts
const getAllAnalysts = async (req, res) => {
  try {
    const analysts = await Analyst.findAll({
      attributes: { exclude: ["pass"] }, // Excluye las contraseñas de la respuesta
    });

    res.status(200).json(analysts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving analysts" });
  }
};

// Actualizar un Analyst
const updateAnalyst = async (req, res) => {
  try {
    const analyst = await Analyst.findByPk(req.params.id);

    if (!analyst) {
      return res.status(404).json({ error: "Analyst not found" });
    }

    const { name, email, pass, confirmPassword, ...rest } = req.body;

    if (name) analyst.name = name;
    if (email) analyst.email = email;

    if (pass && confirmPassword) {
      if (pass !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      const hashedPassword = await bcrypt.hash(pass, 10);
      analyst.pass = hashedPassword;
    }

    Object.assign(analyst, rest);

    await analyst.save();

    res.status(200).json(analyst);
  } catch (error) {
    res.status(500).json({ error: "Error updating analyst" });
  }
};

// Eliminar un Analyst
const deleteAnalyst = async (req, res) => {
  try {
    const analyst = await Analyst.findByPk(req.params.id);

    if (!analyst) {
      return res.status(404).json({ error: "Analyst not found" });
    }

    await analyst.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error deleting analyst" });
  }
};


// Restaurar un Analyst eliminado
const restoreAnalyst = async (req, res) => {
  try {
    const analyst = await Analyst.findOne({
      where: { analystId: req.params.id },
      paranoid: false, // Esto permite encontrar registros eliminados
    });

    if (!analyst) {
      return res.status(404).json({ error: "Analyst not found" });
    }

    if (!analyst.deletedAt) {
      return res.status(400).json({ error: "Analyst is not deleted" });
    }

    await analyst.restore();

    res.status(200).json({
      message: "Analyst restored successfully",
      analyst
    });
  } catch (error) {
    res.status(500).json({ error: "Error restoring analyst" });
  }
};

module.exports = {
  createAnalyst,
  getAnalyst,
  getAllAnalysts,
  updateAnalyst,
  deleteAnalyst,
  restoreAnalyst
};
