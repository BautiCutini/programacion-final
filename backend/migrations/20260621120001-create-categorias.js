'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorias', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: { isIn: [['ingreso', 'gasto']] }
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      }
    });

    // CHECK constraint para validar 'tipo' a nivel de base de datos
    await queryInterface.sequelize.query(`
      ALTER TABLE categorias
      ADD CONSTRAINT chk_categorias_tipo
      CHECK (tipo IN ('ingreso', 'gasto'));
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('categorias');
  }
};
