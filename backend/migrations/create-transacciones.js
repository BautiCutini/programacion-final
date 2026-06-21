'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transacciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      monto: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      tipo: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: { isIn: [['ingreso', 'gasto']] }
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE')
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
      categoriaId: {
        field: 'categoria_id',
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categorias',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      }
    });

    // CHECK constraints (monto positivo y tipo válido)
    await queryInterface.sequelize.query(`
      ALTER TABLE transacciones
      ADD CONSTRAINT chk_transacciones_monto CHECK (monto > 0),
      ADD CONSTRAINT chk_transacciones_tipo CHECK (tipo IN ('ingreso', 'gasto'));
    `);

    // Índices para las consultas más comunes
    await queryInterface.addIndex('transacciones', ['user_id'], { name: 'idx_transacciones_user_id' });
    await queryInterface.addIndex('transacciones', ['fecha'], { name: 'idx_transacciones_fecha' });
    await queryInterface.addIndex('transacciones', ['tipo'], { name: 'idx_transacciones_tipo' });
    await queryInterface.addIndex('transacciones', ['categoria_id'], { name: 'idx_transacciones_categoria' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('transacciones');
  }
};
