const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class Analista extends Model {
  static associate(models) {
    Analista.belongsTo(models.Empresa, {
      foreignKey: "idEmpresa",
      as: "empresa",
    });
    Analista.belongsTo(models.Supervisor, {
      foreignKey: "idSupervisor",
      as: "supervisor",
    });
    Analista.belongsTo(models.TipoAnalista, {
      foreignKey: "idTipoAnalista",
      as: "tipoAnalista",
    });
  }
}

Analista.init(
  {
    idAnalista: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
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
    idSupervisor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Supervisor',
        key: 'idSupervisor',
      },
    },
    idTipoAnalista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TipoAnalista',
        key: 'idTipoAnalista',
      },
    },
    flgActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flgCambiaPass: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    flgBuzon: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fecCambioPass: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cantLog: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    flgBloqueado: {
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
    modelName: "Analista",
    tableName: "Analista",
    timestamps: true,
  }
);

module.exports = Analista;
