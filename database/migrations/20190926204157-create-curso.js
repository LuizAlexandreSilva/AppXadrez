'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sigla: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 6],
            msg: 'A sigla precisa ter entre 3 e 6 caracteres.'
          }
        }
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 40],
            msg: 'O nome precisa ter entre 5 e 40 caracteres.'
          }
        }
      },
      descricao: {
        type: Sequelize.TEXT
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cursos');
  }
};