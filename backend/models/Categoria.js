const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Categoria = sequelize.define('Categoria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    tipo: {
      type: DataTypes.ENUM('ingreso', 'gasto'),
      allowNull: false
      },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    }
    }, {
    tableName: 'categorias',
    timestamps: true,
    updatedAt: false,
    underscored: true
  });

    Categoria.associate = (models) => {
    Categoria.belongsTo(models.User, { foreignKey: 'userId' });
    Categoria.hasMany(models.Transaccion, { foreignKey: 'categoriaId' });
  };

  return Categoria;
}


