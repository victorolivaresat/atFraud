const FraudMotive = require('../models/FraudMotive');

// Crear un nuevo FraudMotive
const createFraudMotive = async (req, res) => {
  try {
    const { motiveFraudName, flgActive, ...rest } = req.body;

    const fraudMotive = await FraudMotive.create({
      motiveFraudName,
      flgActive,
      ...rest
    });

    res.status(201).json({
      message: "FraudMotive created successfully",
      fraudMotive
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating fraud motive", message: error.message });
  }
};

// Obtener un FraudMotive por ID
const getFraudMotive = async (req, res) => {
  try {
    const fraudMotive = await FraudMotive.findByPk(req.params.id);

    if (!fraudMotive) {
      return res.status(404).json({ error: "FraudMotive not found" });
    }

    res.status(200).json(fraudMotive);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving fraud motive" });
  }
};

// Obtener todos los FraudMotives
const getAllFraudMotives = async (req, res) => {
  try {
    const fraudMotives = await FraudMotive.findAll();

    res.status(200).json(fraudMotives);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving fraud motives" });
  }
};

// Actualizar un FraudMotive
const updateFraudMotive = async (req, res) => {
  try {
    const fraudMotive = await FraudMotive.findByPk(req.params.id);

    if (!fraudMotive) {
      return res.status(404).json({ error: "FraudMotive not found" });
    }

    const { motiveFraudName, flgActive, ...rest } = req.body;

    if (motiveFraudName) fraudMotive.motiveFraudName = motiveFraudName;
    if (flgActive !== undefined) fraudMotive.flgActive = flgActive;

    Object.assign(fraudMotive, rest);

    await fraudMotive.save();

    res.status(200).json(fraudMotive);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating fraud motive" });
  }
};

// Eliminar un FraudMotive
const deleteFraudMotive = async (req, res) => {
  try {
    const fraudMotive = await FraudMotive.findByPk(req.params.id);

    if (!fraudMotive) {
      return res.status(404).json({ error: "FraudMotive not found" });
    }

    await fraudMotive.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting fraud motive" });
  }
};

// Restaurar un FraudMotive eliminado
const restoreFraudMotive = async (req, res) => {
  try {
    const fraudMotive = await FraudMotive.findOne({
      where: { motiveFraudId: req.params.id },
      paranoid: false, // Esto permite encontrar registros eliminados
    });

    if (!fraudMotive) {
      return res.status(404).json({ error: "FraudMotive not found" });
    }

    if (!fraudMotive.deletedAt) {
      return res.status(400).json({ error: "FraudMotive is not deleted" });
    }

    await fraudMotive.restore();

    res.status(200).json({
      message: "FraudMotive restored successfully",
      fraudMotive
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error restoring fraud motive" });
  }
};

module.exports = {
  createFraudMotive,
  getFraudMotive,
  getAllFraudMotives,
  updateFraudMotive,
  deleteFraudMotive,
  restoreFraudMotive
};