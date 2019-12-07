module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        postTitle: {
            type: DataTypes.STRING,
        },
        postContent: {
            type: DataTypes.STRING
        }
    });

    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            },
        })
    }

    return Post;
}