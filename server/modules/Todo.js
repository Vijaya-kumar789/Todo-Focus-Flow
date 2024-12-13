import mongoose from "mongoose";

const Todos = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    status: {
        type: String,
        enum: ['not completed', 'completed'],
        default: 'not completed',  // Default status is 'not completed'
      },
    userId:{
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the current date and time
      },
      updatedAt: {
        type: Date,
        default: Date.now,  // Automatically set the current date and time
      },
});

Todos.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

 const Todo = mongoose.model('Todos',Todos);

 export default Todo;