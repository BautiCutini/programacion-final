const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const hash = await bcrypt.hash(user.password, saltRounds = 10);
        console.log('Hash generado:', hash);

        // TODO: Hashear la contraseña antes de guardar el usuario.
        // Pista: usar bcrypt.hash() con 10 rondas de salt.
      }
    }
  });

  User.prototype.validarPassword = async function (password) {
    const coinciden = await bcrypt.compare(password, this.password);
    console.log("la contraseña es correcta?", coinciden);
    return coinciden;
    // Pista: usar bcrypt.compare()
  };

  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return User;
};