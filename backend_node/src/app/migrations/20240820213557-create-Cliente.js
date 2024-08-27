'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cliente', {
      idCliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codClienteAT: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tipoDocumento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numeroDocumento: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      apcliente: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      amcliente: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nbrcliente: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      flgActivo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      idUbigeo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ubigeo', // Nombre de la tabla de referencia
          key: 'idUbigeo',
        },
      },
      idTipoCliente: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TipoCliente', // Nombre de la tabla de referencia
          key: 'idTipoCliente',
        },
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
    await queryInterface.dropTable('Cliente');
  }
};
