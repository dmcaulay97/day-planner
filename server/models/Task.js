const { Schema } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = taskSchema;
