const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// app.get('/', (req, res) => {
//     res.send("Hello From Graphql");
// });

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type User {
            id : ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!

        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            userId: ID!
        }

        type Query {
            getTodos: [Todo]
            getAllUser: [User]
            getUser(id: ID!): User
        }
        `,
        resolvers: {
            Query: {
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos/')).data,
                getAllUser: async () => (await axios.get('https://jsonplaceholder.typicode.com/users/')).data,
                getUser: async (parent, {id}) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            },
        }
    });

    app.use(bodyParser.json());
    app.use(cors());
    await server.start();

    app.use('/graph', expressMiddleware(server));

    app.listen(8000, () => {
        console.log("App Running Successfully");
    })
}
startServer();