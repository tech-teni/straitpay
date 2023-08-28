const TaskModel = require("../models/taskModel");

const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (title === "" || description === "") {
      return res.status(400).json({
        status: false,
        msg: "all field are required",
        data: {},
      });
    }
    const task = await TaskModel.create({ title, description });
    return res.status(201).json({
      status: true,
      msg: "task created successfully",
      data: { task },
    });
  } catch (error) {}
};

const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    if (tasks.length < 1) {
      return res.json({
        status: true,
        msg: "No task created yet",
        data: [],
      });
    }
    res.json({
      status: true,
      msg: "successfuly fetch all task",
      data: tasks,
    });
  } catch (error) {}
};

const getTaskById = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        status: false,
        msg: `No task found with id ${id}`,
        data: {},
      });
    }
    return res.json({
      status: true,
      msg: `task found`,
      data: task,
    });
  } catch (error) {
    if (error?.message.includes("Cast to ObjectId failed")) {
      return res.status(404).json({
        status: false,
        msg: `No task found with id ${id}`,
        data: {},
      });
    }
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { isCompleted, description, title } = req.body;
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        status: false,
        msg: `task not found`,
        data: {},
      });
    }
    await task.updateOne({ description, title, isCompleted }, { new: true });
    const updatedTask = await TaskModel.findById(id);
    return res.json({
      status: true,
      msg: `task updated`,
      data: updatedTask,
    });
  } catch (error) {}
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        status: false,
        msg: `task not found`,
        data: {},
      });
    }
    await task.deleteOne();
    return res.json({
      status: true,
      msg: `task deleted`,
      data: {},
    });
  } catch (error) {}
};

module.exports = {
  createTask,
  getTaskById,
  getTasks,
  deleteTask,
  updateTask,
};
