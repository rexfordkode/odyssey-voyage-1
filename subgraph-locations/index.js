const {ApolloServer, gql} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync('./location.graphql', {encoding: 'utf-8'}));

const resolvers = require('./resolvers');
const LocationsAPI = require('./datasources/LocationsApi');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      locationsAPI: new LocationsAPI()
    };
  }
});


const subgraphName = 'locations';
const port = 4002

server
  .listen(port)
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });


  