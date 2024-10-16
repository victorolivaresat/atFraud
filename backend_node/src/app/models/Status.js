const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class Status extends Model {
  static associate(models) {
    // Definir asociaciones si es necesario
  }
}

Status.init(
  {
    statusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flgEvaluation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Status",
    tableName: "status",
    timestamps: false,
  }
);

module.exports = Status;