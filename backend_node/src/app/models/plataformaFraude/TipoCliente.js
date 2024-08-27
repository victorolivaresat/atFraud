const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class TipoCliente extends Model {
  static associate(models) {
    TipoCliente.hasMany(models.Cliente, {
      foreignKey: "idTipoCliente",
      as: "clientes",
    });
  }
}

TipoCliente.init(
  {
    idTipoCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nbrTipoCliente: {
      type: DataTypes.STRING(50),
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
    modelName: "TipoCliente",
    tableName: "TipoCliente",
    timestamps: true,
  }
);

module.exports = TipoCliente;
