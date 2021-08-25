const { Schema } = require('mongoose');

const eventSchema = new Schema({
  date: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
});

module.exports = eventSchema;
