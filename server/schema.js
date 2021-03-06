const { gql } = require("apollo-server");

// Type Definition for all Types
const typeDefs = gql`
  type Query {
    quakes(pageSize: Int, after: String): QuakeConnection!
    quake(id: ID!): Quake
    users: [User]
    me: User
  }

  type QuakeConnection {
    cursor: String!
    hasMore: Boolean!
    quakes: [Quake]!
  }

  type Quake {
    id: ID!
    location: String
    magnitute: Float
    when: String
    cursor: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    records: [Quake]
  }

  type Mutation {
    saveRecord(recordId: ID!): RecordUpdateResponse!
    deleteRecord(recordId: ID!): RecordUpdateResponse!
    login(email: String): String
  }

  type RecordUpdateResponse {
    success: Boolean!
    message: String!
    records: [Quake]
  }
`;

module.exports = typeDefs;
