const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction) {
  // На Render (продакшен) используем PostgreSQL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Нужно для бесплатного тарифа Render
      }
    }
  });
} else {
  // На localhost (разработка) используем SQLite
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
}

module.exports = sequelize;