const { Schema } = require('mongoose');

const eventSchema = new Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    default: this.start,
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
