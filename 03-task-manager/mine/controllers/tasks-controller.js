const Tasks = require("../models/tasks-model");
const tryCatchWrapper = require("../middleware/try-catch-wrapper");
const { createCustomAPIError } = require("../errors/customs-error");

const getAllTasks = tryCatchWrapper(async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json({ tasks });
});

const createTask = tryCatchWrapper(async (req, res) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({ task });
});

const getSingleTask = tryCatchWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Tasks.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomAPIError(`No task with ID: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = tryCatchWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Tasks.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomAPIError(`No task with ID: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = tryCatchWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Tasks.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomAPIError(`No task with ID: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
