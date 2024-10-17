const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class FraudMotive extends Model {
  static associate(models) {
    // Relaciones
  }
}

FraudMotive.init(
  {
    motiveFraudId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    motiveFraudName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flgActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "FraudMotive",
    tableName: "fraud_motives",
    timestamps: false,
  }
);

module.exports = FraudMotive;