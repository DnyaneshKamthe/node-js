const bcrypt = require('bcrypt');
const { User } = require('../models'); // Adjust path if needed

const seedUsers = async () => {
    try {
        // Sample user data
        const users = [
            {
                username: 'John Doe',
                mobile: '1234567890',
                email: 'john@example.com',
                password: 'password123',
            },
            {
                username: 'Jane Smith',
                mobile: '9876543210',
                email: 'jane@example.com',
                password: 'securepass456',
            },
        ];

        // Hash passwords before inserting
        for (const user of users) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        // Insert into DB
        await User.bulkCreate(users);
        console.log('✅ Users seeded successfully.');
    } catch (error) {
        console.error('❌ Error seeding users:', error);
    }
};

module.exports = seedUsers;
