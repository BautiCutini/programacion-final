'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('transacciones', [
    {
      monto: 150000,
      descripcion: 'Sueldo de junio',
      tipo: 'ingreso',
      fecha: '2026-06-01',
      user_id: 1,
      categoria_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      monto: 8000,
      descripcion: 'Supermercado',
      tipo: 'gasto',
      fecha: '2026-06-05',
      user_id: 1,
      categoria_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      monto: 3000,
      descripcion: 'Colectivo',
      tipo: 'gasto',
      fecha: '2026-06-10',
      user_id: 1,
      categoria_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      monto: 25000,
      descripcion: 'Trabajo freelance',
      tipo: 'ingreso',
      fecha: '2026-06-12',
      user_id: 2,
      categoria_id: 4,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
},

async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('transacciones', null, {});
}
};
