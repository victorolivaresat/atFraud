const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class Analyst extends Model {
  static associate(models) {
    Analyst.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "company",
    });
    Analyst.belongsTo(models.TypeAnalyst, {
      foreignKey: "typeAnalystId",
      as: "typeAnalyst",
    });
  }
}

Analyst.init(
  {
    analystId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'companyId',
      },
    },
    typeAnalystId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TypeAnalyst',
        key: 'typeAnalystId',
      },
    },
    flgActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flgChangePass: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    flgMailBox: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    changePassDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    cantLog: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    flgBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rememberToken: {
      type: DataTypes.STRING,
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Analyst",
    tableName: "analysts",
    timestamps: true,
  }
);

module.exports = Analyst;
