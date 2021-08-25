const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		events: [Event]!
      }
      
      type Event {
	      description: String!
	      date: Int!
	      title: String!
      }
 
      type Auth {
		token: ID!
		user: User
      }
       
     type Query {
	     me: User
     }

     type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveEvent(date: Int!, description: String!, title: String!): User 
		removeEvent(_id: ID!): User
     }

`;
module.exports = typeDefs;

//update look at !