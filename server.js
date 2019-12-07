const {
  ApolloServer
} = require("apollo-server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const models = require('./models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({
    req
  }) => ({
    req
  })
});

models.sequelize.sync({
  force: true
}).then(() => {
  server.listen(5000);
})