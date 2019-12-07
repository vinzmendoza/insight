module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        commentContent: {
            type: DataTypes.STRING,
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            },
        });
        Comment.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
                field: 'post_id'
            },
        });
    }

    return Comment;
}