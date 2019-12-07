const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query
    },
    Mutation: {
        ...commentsResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...usersResolvers.Mutation
    }
}