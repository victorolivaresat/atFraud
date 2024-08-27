const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Origen = require("../origen");
const Empresa = require("../empresa");
const FamiliaTrx = require("../familiaTrx");
const Canal = require("../canal");

class Transaccion extends Model {
  static associate(models) {
    Transaccion.belongsTo(models.Origen, {
      foreignKey: "idOrigen",
      as: "origen",
    });
    Transaccion.belongsTo(models.Empresa, {
      foreignKey: "idEmpresa",
      as: "empresa",
    });
    Transaccion.belongsTo(models.FamiliaTrx, {
      foreignKey: "idFamiliaTransaccion",
      as: "familiaTrx",
    });
    Transaccion.belongsTo(models.Canal, {
      foreignKey: "idCanal",
      as: "canal",
    });
  }
}

Transaccion.init(
  {
    idTransaccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idOrigen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Origen',
        key: 'idOrigen',
      },
    },
    idEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Empresa',
        key: 'idEmpresa',
      },
    },
    flgActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    nbrTransaccion: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    codTransaccion: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    idFamiliaTransaccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FamiliaTrx',
        key: 'idFamilia',
      },
    },
    idCanal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Canal',
        key: 'idCanal',
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
    modelName: "Transaccion",
    tableName: "Transaccion",
    timestamps: true,
  }
);

module.exports = Transaccion;
