// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

const UserModel = require('./User');
const CategoriaModel = require('./Categoria');
const TransaccionModel = require('./Transaccion');
 
const User = UserModel(sequelize);
const Categoria = CategoriaModel(sequelize);
const Transaccion = TransaccionModel(sequelize);
 
const models = { User, Categoria, Transaccion };
 
// Registrar las asociaciones entre modelos
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});
 
module.exports = {
  sequelize,
  Sequelize,
  User,
  Categoria,
  Transaccion
};
