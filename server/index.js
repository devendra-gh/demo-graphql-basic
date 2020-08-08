const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("./utils");

const QuakeAPI = require("./datasources/quake");
const UserAPI = require("./datasources/user");

const store = createStore();

// Apollo Server Setup
const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || "";
    // const email = Buffer.from(auth, "base64").toString("ascii");

    let email = "";
    let token = "";

    const getToken = () => {
      return auth.split(" ")[1];
    };

    if (auth.length && auth.split(" ")[1]) {
      token = getToken();
    }

    if (token !== "") {
      email = jwt.verify(token, "secrete_key").email;
    }

    const usercheck = await store.users.map((user) => {
      if (email === user.email) {
        return user;
      }
    });

    let users = [];
    await usercheck.forEach((elem) => {
      if (elem) {
        users.push(elem);
      }
    });

    const user = users && users[0] ? users[0] : null;

    return { user };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    quakeAPI: new QuakeAPI(),
    userAPI: new UserAPI({
      store,
    }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
