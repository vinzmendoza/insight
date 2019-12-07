const models = require('../../models');

module.exports = {
    Mutation: {
        async createComment(_, {
            commentInput: {
                postId,
                commentContent
            }
        }) {

        }
    }
}