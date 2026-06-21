'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('users', [
    {
      nombre: 'Usuario Demo',
      email: 'demo@test.com',
      password: 'demo123',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'Usuario Dos',
      email: 'usuario2@test.com',
      password: 'demo123',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
},

 async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
 }
};
