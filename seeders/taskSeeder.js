const { TaskTracker } = require('../models'); // Adjust the path if needed

const seedTasks = async () => {
    try {
        const tasks = [
            {
                taskName: 'Implement Login API',
                description: 'Create login endpoint with JWT authentication',
                uatBranchName: 'feature/login-api',
                prodBranchName: 'release/login-api',
                uatPrUrl: 'https://github.com/example/repo/pull/101',
                prodPrUrl: 'https://github.com/example/repo/pull/102',
                isMergedOnUAT: true,
                isMergedOnProd: false,
            },
            {
                taskName: 'Fix Dashboard UI',
                description: 'Resolve alignment issues and add loading spinner',
                uatBranchName: 'bugfix/dashboard-ui',
                prodBranchName: 'release/dashboard-fix',
                uatPrUrl: 'https://github.com/example/repo/pull/103',
                prodPrUrl: 'https://github.com/example/repo/pull/104',
                isMergedOnUAT: true,
                isMergedOnProd: true,
            },
            {
                taskName: 'Optimize Search Feature',
                description: 'Improve performance of search API with indexes',
                uatBranchName: 'feature/search-optimization',
                prodBranchName: null,
                uatPrUrl: 'https://github.com/example/repo/pull/105',
                prodPrUrl: null,
                isMergedOnUAT: false,
                isMergedOnProd: false,
            },
        ];

        await TaskTracker.bulkCreate(tasks);
        console.log('✅ TaskTracker data seeded successfully.');
    } catch (error) {
        console.error('❌ Error seeding TaskTracker:', error);
    }
};

module.exports = seedTasks;
