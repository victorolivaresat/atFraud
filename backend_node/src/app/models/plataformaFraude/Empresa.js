const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class Empresa extends Model {
  static associate(models) {
    Empresa.hasMany(models.User, {
      foreignKey: "idEmpresa",
      as: "users",
    });
    Empresa.hasMany(models.Supervisor, {
      foreignKey: "idEmpresa",
      as: "supervisors",
    });
    Empresa.hasMany(models.Caso, {
      foreignKey: "idEmpresa",
      as: "casos",
    });
    Empresa.hasMany(models.Transaccion, {
      foreignKey: "idEmpresa",
      as: "transacciones",
    });
  }
}

Empresa.init(
  {
    idEmpresa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nbrEmpresa: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    modelName: "Empresa",
    tableName: "Empresa",
    timestamps: true,
  }
);

module.exports = Empresa;
