'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('categorias', [
    {
      nombre: 'Sueldo',
      tipo: 'ingreso',
      user_id: 1,
      created_at: new Date()
    },
    {
      nombre: 'Comida',
      tipo: 'gasto',
      user_id: 1,
      created_at: new Date()
    },
    {
      nombre: 'Transporte',
      tipo: 'gasto',
      user_id: 1,
      created_at: new Date()
    },
    {
      nombre: 'Freelance',
      tipo: 'ingreso',
      user_id: 2,
      created_at: new Date()
    }
  ]);
},

async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('categorias', null, {});
}
};
