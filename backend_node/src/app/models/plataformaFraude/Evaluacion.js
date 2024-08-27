const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Analista = require("../analista");
const MotivoFraude = require("../motivoFraude");

class Evaluacion extends Model {
  static associate(models) {
    Evaluacion.belongsTo(models.Analista, {
      foreignKey: "idAnalista",
      as: "analista",
    });
    Evaluacion.belongsTo(models.MotivoFraude, {
      foreignKey: "idMotivoFraude",
      as: "motivoFraude",
    });
  }
}

Evaluacion.init(
  {
    idCaso: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    fecgeneracion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecinieval: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecfineval: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    idAnalista: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Analista',
        key: 'idAnalista',
      },
    },
    flgCierreMasivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    flgEvaluado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    idResultado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comentario_analista: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecactualizacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    monto: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
    },
    idMotivoFraude: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MotivoFraude',
        key: 'idMotivoFraude',
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
    modelName: "Evaluacion",
    tableName: "Evaluacion",
    timestamps: true,
  }
);

module.exports = Evaluacion;
