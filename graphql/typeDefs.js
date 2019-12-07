const gql = require('graphql-tag');

module.exports = gql `
    type Comment {
        id: Int!
        commentContent: String!
    }

    type Save {
        id: Int!
        user: User!
        post: [Post!]
    }

    type Post {
        id: Int!
        postTitle: String!
        postContent: String!
        # createdAt: String!
        creator: User!
        comments: [Comment!]
    }

    type User {
        id: Int!
        username: String!
        token: String!
        # createdAt: String!
        createdPosts: [Post!]
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    input PostInput {
        title: String!
        body: String!
    }

    input CommentInput {
        postId: Int!
        commentContent: String!
    }
    
    type Query {
        getPosts: [Post!]
        getPost(postId: Int!): Post

        getUsers: [User!]
        getUser(userId: Int!): User
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!

        createPost(postInput: PostInput): Post!

        createComment(commentInput: CommentInput!): Post!
    }
`