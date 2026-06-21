const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaccion = sequelize.define('Transaccion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'categoria_id'
    }
  }, {
    tableName: 'transacciones',
    timestamps: true,
    updatedAt: false,
    underscored: true
  });
  
    Transaccion.associate = (models) => {
    Transaccion.belongsTo(models.User, { foreignKey: 'userId' });
    Transaccion.belongsTo(models.Categoria, { foreignKey: 'categoriaId' });
  };

  return Transaccion;
};