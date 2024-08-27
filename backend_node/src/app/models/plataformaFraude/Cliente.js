const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Ubigeo = require("../ubigeo");
const TipoCliente = require("../tipoCliente");

class Cliente extends Model {
  static associate(models) {
    Cliente.belongsTo(models.Ubigeo, {
      foreignKey: "idUbigeo",
      as: "ubigeo",
    });
    Cliente.belongsTo(models.TipoCliente, {
      foreignKey: "idTipoCliente",
      as: "tipoCliente",
    });
    Cliente.hasMany(models.Caso, {
      foreignKey: "idCliente",
      as: "casos",
    });
  }
}

Cliente.init(
  {
    idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codClienteAT: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tipoDocumento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numeroDocumento: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    apcliente: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    amcliente: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nbrcliente: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    flgActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    idUbigeo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ubigeo',
        key: 'idUbigeo',
      },
    },
    idTipoCliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TipoCliente',
        key: 'idTipoCliente',
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
    modelName: "Cliente",
    tableName: "Cliente",
    timestamps: true,
  }
);

module.exports = Cliente;
