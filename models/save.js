module.exports = (sequelize, DataTypes) => {
    const Save = sequelize.define('save');

    Save.associate = (models) => {
        Save.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            },
        });
        Save.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
                field: 'post_id'
            },
        });
    }

    return Save;
}