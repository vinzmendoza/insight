module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Post)
    }

    return User;
}