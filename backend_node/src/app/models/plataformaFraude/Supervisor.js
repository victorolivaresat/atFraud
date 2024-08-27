const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Empresa = require("../empresa");

class Supervisor extends Model {
  static associate(models) {
    Supervisor.belongsTo(models.Empresa, {
      foreignKey: "idEmpresa",
      as: "empresa",
    });
    Supervisor.hasMany(models.User, {
      foreignKey: "idSupervisor",
      as: "users",
    });
  }
}

Supervisor.init(
  {
    idSupervisor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nbrSupervisor: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING(18),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    modelName: "Supervisor",
    tableName: "Supervisor",
    timestamps: true,
  }
);

module.exports = Supervisor;
