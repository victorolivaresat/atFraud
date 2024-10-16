const Status = require('../models/Status');

// Crear un nuevo Status
const createStatus = async (req, res) => {
  try {
    const { statusName, flgEvaluation, ...rest } = req.body;

    const status = await Status.create({
      statusName,
      flgEvaluation,
      ...rest
    });

    res.status(201).json({
      message: "Status created successfully",
      status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating status", message: error.message });
  }
};

// Obtener un Status por ID
const getStatus = async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.id);

    if (!status) {
      return res.status(404).json({ error: "Status not found" });
    }

    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving status" });
  }
};

// Obtener todos los Statuses
const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();

    res.status(200).json(statuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving statuses" });
  }
};

// Actualizar un Status
const updateStatus = async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.id);

    if (!status) {
      return res.status(404).json({ error: "Status not found" });
    }

    const { statusName, flgEvaluation, ...rest } = req.body;

    if (statusName) status.statusName = statusName;
    if (flgEvaluation !== undefined) status.flgEvaluation = flgEvaluation;

    Object.assign(status, rest);

    await status.save();

    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating status" });
  }
};

// Eliminar un Status
const deleteStatus = async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.id);

    if (!status) {
      return res.status(404).json({ error: "Status not found" });
    }

    await status.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting status" });
  }
};

// Restaurar un Status eliminado
const restoreStatus = async (req, res) => {
  try {
    const status = await Status.findOne({
      where: { statusId: req.params.id },
      paranoid: false, // Esto permite encontrar registros eliminados
    });

    if (!status) {
      return res.status(404).json({ error: "Status not found" });
    }

    if (!status.deletedAt) {
      return res.status(400).json({ error: "Status is not deleted" });
    }

    await status.restore();

    res.status(200).json({
      message: "Status restored successfully",
      status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error restoring status" });
  }
};

module.exports = {
  createStatus,
  getStatus,
  getAllStatuses,
  updateStatus,
  deleteStatus,
  restoreStatus
};