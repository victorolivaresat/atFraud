const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class Ubigeo extends Model {
  static associate(models) {
    Ubigeo.hasMany(models.Cliente, {
      foreignKey: "idUbigeo",
      as: "clientes",
    });
  }
}

Ubigeo.init(
  {
    idUbigeo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    coddpto: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    codprov: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    coddist: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    nbrUbigeo: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
    modelName: "Ubigeo",
    tableName: "Ubigeo",
    timestamps: true,
  }
);

module.exports = Ubigeo;
