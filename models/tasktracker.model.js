module.exports = (sequelize, DataTypes) => {
    const TaskTracker = sequelize.define('TaskTracker', {
        taskName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shortDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        uatBranchName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        prodBranchName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        uatPrUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
        prodPrUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
        isMergedOnUAT: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isMergedOnProd: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: true,
        tableName: 'task_trackers',
    });

    return TaskTracker;
};
