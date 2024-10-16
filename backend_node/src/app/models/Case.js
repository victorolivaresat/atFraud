const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class Case extends Model {
  static associate(models) {
    Case.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "company",
    });
    Case.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client",
    });
  }
}

Case.init(
  {
    caseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Client',
        key: 'clientId',
      },
    },
    numCase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flgConcentrator: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    flgMasive: {
      type: DataTypes.BOOLEAN,
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
    flgRecentUpload: {
      type: DataTypes.BOOLEAN,
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
    modelName: "Case",
    tableName: "cases",
    timestamps: true,
  }
);

module.exports = Case;