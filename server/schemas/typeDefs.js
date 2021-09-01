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
		start: DateTime!
		end: DateTime!
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
		saveEvent(start: DateTime!, end: DateTime!, title: String!, category: String!): User 
		saveTask(title: String!): User
		removeEvent(_id: String!): User
		removeTask(_id: String!): User
		updateTask(_id: String!, completed: Boolean): User
		updateEvent(_id: String!, title: String!, start: DateTime!, end: DateTime!, category: String!): User
	}

`;

module.exports = typeDefs;

//update look at !