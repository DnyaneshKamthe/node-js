const seedUsers = require('./seeders/userSeeder');
const seedTasks = require('./seeders/taskSeeder');
const { sequelize } = require('./models');

const runSeeders = async () => {
    try {
        await sequelize.sync({ alter: true });
        await seedUsers();
        await seedTasks();
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

runSeeders();
