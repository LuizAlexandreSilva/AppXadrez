'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cursos', [
      {
        id: 1,
        sigla: 'IE08',
        nome: 'Ciência da Computação',
        descricao: '',
        area_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        sigla: 'IE15',
        nome: 'Engenharia de Software',
        descricao: '',
        area_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        sigla: 'FT05',
        nome: 'Engenharia da Computação',
        descricao: '',
        area_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cursos', {}, {});

  }
};
