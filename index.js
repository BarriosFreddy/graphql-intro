const app = require("express")();
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers");
const mongodbSvc = require("./lib/mongodbSvc");

const { PORT, NODE_ENV } = process.env;
const isDev = NODE_ENV === 'dev'

mongodbSvc.connect();

const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
);

app.listen(PORT || 3000, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// graphql(schema, '{ hello }', resolvers).then((data) => console.log(data));
