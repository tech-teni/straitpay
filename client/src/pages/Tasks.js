import React from "react";
import Header from "../components/Header";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";

const Tasks = () => {
  return (
    <div>
      <Header />
      <div className="task-content">
        <CreateTask />
        <TaskList />
      </div>
    </div>
  );
};

export default Tasks;
