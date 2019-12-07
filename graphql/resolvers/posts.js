const models = require('../../models');
const checkAuth = require('../../utils/checkAuth');


module.exports = {
    Query: {
        async getPosts() {

        },
        async getPost(_, {
            postId
        }) {

        }
    },
    Mutation: {
        async createPost(_, {
            postInput: {
                title,
                body
            }
        }, context) {

        }
    }
}