const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");
const Caso = require("../caso");
const Analista = require("../analista");

class Documento extends Model {
  static associate(models) {
    Documento.belongsTo(models.Caso, {
      foreignKey: "idCaso",
      as: "caso",
    });
    Documento.belongsTo(models.Analista, {
      foreignKey: "idAnalista",
      as: "analista",
    });
  }
}

Documento.init(
  {
    idDocumento: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    idCaso: {
      type: DataTypes.BIGINT,
      references: {
        model: 'CASO',
        key: 'idCaso',
      },
    },
    ruta: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    nbrDocumento: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    fecRegistro: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    flgEvaluacion: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    idAnalista: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Analista',
        key: 'idAnalista',
      },
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
    modelName: "Documento",
    tableName: "Documento",
    timestamps: true,
  }
);

module.exports = Documento;
