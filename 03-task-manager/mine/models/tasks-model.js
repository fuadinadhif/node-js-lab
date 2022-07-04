const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task's name have to be provided"],
    trim: true,
    maxlength: [20, "Task's name should not exceeds 20 words"],
  },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Tasks", taskSchema);
