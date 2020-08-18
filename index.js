const app = require("express")();
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers");
const mongodbSvc = require("./lib/mongodbSvc");

const PORT = process.env.PORT || 3000;

mongodbSvc.connect();

const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// graphql(schema, '{ hello }', resolvers).then((data) => console.log(data));
