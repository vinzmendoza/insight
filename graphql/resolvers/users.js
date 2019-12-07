const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    UserInputError
} = require('apollo-server')

const models = require('../../models');
const {
    SECRET_KEY
} = require('../../config');
const {
    validateRegisterInput,
    validateLoginInput
} = require('../../utils/validators');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        username: user.username
    }, SECRET_KEY, {
        expiresIn: '1h'
    });
}

module.exports = {
    Query: {
        async getUsers() {
            try {
                return await models.User.findAll()
            } catch (err) {
                throw new Error(err);
            }
        },
        async getUser(_, {
            userId
        }) {
            try {
                return await models.User.findOne({
                    where: {
                        id: userId
                    }
                })
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async register(_, {
            registerInput: {
                username,
                password,
                confirmPassword
            }
        }) {
            const {
                valid,
                errors
            } = validateRegisterInput(username, password, confirmPassword);

            if (!valid) {
                errors.input = 'Invalid input';
                throw new UserInputError('Invalid register input', {
                    errors: {
                        input: 'Invalid input'
                    }
                })
            }

            const user = await models.User.findOne({
                username
            });

            if (user) {
                errors.input = 'Username is already taken.';
                throw new UserInputError('Username is already taken', {
                    errors: {
                        username: 'Username is already taken.'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            try {
                const createdUser = await models.User.create({
                    username,
                    password
                })

                const token = generateToken(createdUser);

                return {
                    ...createdUser.dataValues,
                    token
                }

            } catch (err) {
                return err
            }


        },
        async login(_, {
            loginInput: {
                username,
                password
            }
        }) {
            const {
                valid,
                errors
            } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Invalid credentials', {
                    errors: {
                        account: 'Invalid credentials'
                    }
                })
            }

            const user = await models.User.findOne({
                where: {
                    username
                }
            });

            if (!user) {
                errors.user = 'User does not exist';
                throw new UserInputError('User does not exist', {
                    errors: {
                        username: 'User does not exist'
                    }
                });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.generalErrors = 'Invalid user credentials';
                throw new UserInputError('Invalid user credentials', {
                    errors: {
                        password: 'Invalid password.'
                    }
                });
            }

            const token = generateToken(user)

            try {
                return {
                    ...user.dataValues,
                    token
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}