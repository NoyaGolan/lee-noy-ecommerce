const chalk = require('chalk');
const bcrypt = require('bcryptjs');

const setupDB = require('./db');
const { ROLES } = require('../constants');
const User = require('../models/user');

const seedDB = async () => {
  try {
    console.log(`${chalk.blue('✓')} ${chalk.blue('seed db started')}`);

    // Define user data
    const users = [
      { email: 'admin@gmail.com', password: 'admin123', firstName: 'Admin', lastName: 'User', role: ROLES.Admin },
      { email: 'member@gmail.com', password: 'member123', firstName: 'Member', lastName: 'User', role: ROLES.Member },
      { email: 'merchant@gmail.com', password: 'merchant123', firstName: 'merchantTobe', lastName: 'User', role: ROLES.Member }
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      console.log(`existingUser for ${userData.email}: `, existingUser);
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userData.password, salt);
        const newUser = new User({
          ...userData,
          password: hash
        });
        await newUser.save();
        console.log(`${chalk.green('✓')} Created ${userData.role} user.`);
      } else {
        console.log(`${chalk.yellow('!')} User already exists: ${userData.email}`);
      }
    }

    console.log(`${chalk.green('✓')} ${chalk.green('seed db finished')}`);
  } catch (error) {
    console.log(
        `${chalk.red('x')} ${chalk.red('error while seeding database')}`
    );
    console.log(error);
    return null;
  }
};

(async () => {
  await setupDB().then(async () => {
    await seedDB();
  });
})();
