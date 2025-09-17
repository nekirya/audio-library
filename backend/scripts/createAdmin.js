const sequelize = require('../models/database');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

async function createAdmin() {
  try {
    await sequelize.sync({ force: false });
    
    // Проверяем, существует ли уже администратор
    const existingAdmin = await User.findOne({ 
      where: { 
        [Op.or]: [
          { email: 'admin@example.com' },
          { username: 'admin' }
        ] 
      } 
    });
    
    if (existingAdmin) {
      console.log('Администратор уже существует');
      process.exit(0);
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Администратор создан:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка создания администратора:', error);
    process.exit(1);
  }
}

createAdmin();