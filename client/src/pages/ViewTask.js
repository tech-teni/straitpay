import React from "react";
import Header from "../components/Header";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";
import { useParams } from "react-router-dom";
import TaskContent from "../components/TaskContent";
import EditTaskModel from "../components/EditTaskModel";
const ViewTask = () => {
  let hell = useParams();
  console.log(hell);
  return (
    <div>
      <Header />
      <div className="task-content">
        <EditTaskModel />
        <TaskContent />
      </div>
    </div>
  );
};

export default ViewTask;
