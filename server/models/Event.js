const { Schema } = require('mongoose');

const eventSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  }
});

module.exports = eventSchema;
