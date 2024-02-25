const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const { USERS } = require('./user');
const { TODO } = require('./todo');
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
            user: User
        }

        type Query {
            getTodos: [Todo]
            getAllUser: [User]
            getUser(id: ID!): User
        }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => USERS.find((e) => e.id === todo.id),
            },
            Query: {
                getTodos: async () => TODO,
                getAllUser: async () => USERS,
                getUser: async (parent, { id }) => USERS.find((e) => e.id === id),
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