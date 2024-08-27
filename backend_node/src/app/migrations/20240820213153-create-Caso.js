'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Caso', {
      idCaso: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      idCliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cliente', // El nombre de la tabla de referencia
          key: 'idCliente',
        },
      },
      numCaso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      flgconcentrador: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      flgcargamasiva: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      idEmpresa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Empresa', // El nombre de la tabla de referencia
          key: 'idEmpresa',
        },
      },
      flgRecienteCarga: {
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

    await queryInterface.dropTable('Caso');
  }
};
