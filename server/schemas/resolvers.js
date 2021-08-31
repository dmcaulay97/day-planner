const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const DateTime = require('../utils/DateTime');

const resolvers = {
	DateTime,
	Query: {
		me: async (parent, args, context) => {
			console.log(context.user);
			if (context.user) {
				return User.findOne({ _id: context.user._id });
			}
			throw new AuthenticationError('You need to be logged in!');
		},
	},
	Mutation: {
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('No user found with this email address');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);


			return { token, user };
		},
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		saveEvent: async (parent, args, context) => {
			console.log(args)
			console.log(context.user._id);
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $addToSet: { events: { ...args } } }
			)
			return updatedUser;
		},
		removeEvent: async (parent, { _id }, context) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $pull: { events: { _id } } }
			)
			return updatedUser
		},
		saveTask: async (parent, args, context) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $addToSet: { tasks: { ...args } } }
			)
			return updatedUser;
		},
		removeTask: async (parent, { _id }, context) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $pull: { tasks: { _id } } }
			)
			return updatedUser
		},
		updateTask: async (parent, {_id, completed}, context) => {
			console.log(_id, completed)
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id, 'tasks._id': _id },
				{ $set: { 'tasks.$.completed': completed } }
			)
			return updatedUser
		},
		updateEvent: async (parent, {_id, title, start, end, category }, context) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id, 'events._id': _id },
				{ $set: { 
					'events.$.title': title, 
					'events.$.start': start,
					'events.$.end': end,
					'events.$.category': category
					} 
				}
			)
			return updatedUser
		}
	}
}

module.exports = resolvers;