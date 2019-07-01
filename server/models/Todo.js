const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blueprint schema for database
const TodoUserSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    todos: [{
        placer: {
            type: String
        },
        content: {
            type: String,
        },
        tag: {
            type: String
        },
        createdDate: {
            type: Date,
            default: Date.now()
        },
        completedDate: {
            type: Date,
            default: ''
        }
    }]
    
  }
);

module.exports = TodoUser = mongoose.model("todoUsers", TodoUserSchema);
