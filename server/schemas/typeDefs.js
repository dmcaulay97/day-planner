const { gql } = require('apollo-server-express');
const DateTime = require('../utils/DateTime');

const typeDefs = gql`
	scalar DateTime
	type User {
		_id: ID!
		username: String!
		email: String!
		events: [Event]!
		tasks: [Task]!
      }

	type Task {
		_id: ID!
		title: String!
		completed: Boolean! 
	}
      
	type Event {
		_id: ID!
		description: String!
		date: DateTime!
		title: String!
		category: String
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
		saveEvent(date: DateTime!, description: String!, title: String!, category: String!): User 
		saveTask(title: String!): User
		removeEvent(_id: ID!): User
		removeTask(_id: ID!): User
		updateTask(_id: String!, completed: Boolean): User
	}

`;

module.exports = typeDefs;

//update look at !