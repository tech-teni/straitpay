const express = require("express");
const router = express.Router();
const {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} = require("../controller/task");

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTaskById).delete(deleteTask).put(updateTask);

module.exports = router;
