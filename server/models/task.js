/* ============================================
   FILE: task.js
   PURPOSE: Mongoose schema for task documents
   DATABASE: MongoDB Atlas (via Mongoose)
   ============================================ */

const mongoose = require('mongoose');


// Define the task schema (what each task looks like in the database)
const taskSchema = new mongoose.Schema({
    title:       { type: String, required: true },
    description: { type: String, required: true },
    dueDate:     { type: Date, required: true },
    dateCreated: { type: Date, default: Date.now, required: true },
    completed:   { type: Boolean, required: true, default: false }
});


// Add indexes so MongoDB can sort and search tasks faster
taskSchema.index({ dueDate: 1 });
taskSchema.index({ dateCreated: 1 });


// Create the model (this connects the schema to a "tasks" collection in MongoDB)
const Task = mongoose.model("Task", taskSchema);


// Export so other files can use it
module.exports = Task;
