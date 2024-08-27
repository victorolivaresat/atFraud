const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");
const Cliente = require("../cliente");
const Empresa = require("../empresa");

class Caso extends Model {
  static associate(models) {
    Caso.belongsTo(models.Cliente, {
      foreignKey: "idCliente",
      as: "cliente",
    });
    Caso.belongsTo(models.Empresa, {
      foreignKey: "idEmpresa",
      as: "empresa",
    });
    Caso.hasMany(models.Documento, {
      foreignKey: "idCaso",
      as: "documentos",
    });
    Caso.hasMany(models.Evaluacion, {
      foreignKey: "idCaso",
      as: "evaluaciones",
    });
  }
}

Caso.init(
  {
    idCaso: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'idCliente',
      },
    },
    numCaso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flgconcentrador: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flgcargamasiva: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    idEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Empresa',
        key: 'idEmpresa',
      },
    },
    flgRecienteCarga: {
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
    modelName: "Caso",
    tableName: "Caso",
    timestamps: true,
  }
);

module.exports = Caso;
