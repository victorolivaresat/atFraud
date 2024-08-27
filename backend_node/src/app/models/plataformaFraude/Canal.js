const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");

class Canal extends Model {
  static associate(models) {
    Canal.hasMany(models.Transaccion, {
      foreignKey: "idCanal",
      as: "transacciones",
    });
  }
}

Canal.init(
  {
    idCanal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nbrCanal: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    flgActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Canal",
    tableName: "Canal",
    timestamps: true,
  }
);

module.exports = Canal;
