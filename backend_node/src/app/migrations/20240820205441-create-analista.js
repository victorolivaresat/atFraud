'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Analista', {
      idAnalista: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idEmpresa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Empresas', // El nombre de la tabla de referencia
          key: 'idEmpresa',
        },
      },
      idSupervisor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Supervisores', // El nombre de la tabla de referencia
          key: 'idSupervisor',
        },
      },
      idTipoAnalista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TipoAnalistas', // El nombre de la tabla de referencia
          key: 'idTipoAnalista',
        },
      },
      flgActivo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      flgCambiaPass: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      flgBuzon: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fecCambioPass: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cantLog: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      flgBloqueado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Analista');
  }
};
