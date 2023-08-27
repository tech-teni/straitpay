import React from "react";
import Header from "../components/Header";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";

const Tasks = () => {
  return (
    <div>
      <Header />
      {/* <CreateTask /> */}
      <TaskList />
    </div>
  );
};

export default Tasks;
