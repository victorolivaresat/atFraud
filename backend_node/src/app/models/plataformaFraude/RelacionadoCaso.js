const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Caso = require("../caso");

class RelacionadosCaso extends Model {
  static associate(models) {
    RelacionadosCaso.belongsTo(models.Caso, {
      foreignKey: "idCaso",
      as: "caso",
    });
  }
}

RelacionadosCaso.init(
  {
    idRelacion: {
      type: DataTypes.INTEGER,
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
    idCasoRelacionado: {
      type: DataTypes.BIGINT,
      references: {
        model: 'CASO',
        key: 'idCaso',
      },
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
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
    modelName: "RelacionadosCaso",
    tableName: "RelacionadosCaso",
    timestamps: true,
  }
);

module.exports = RelacionadosCaso;
