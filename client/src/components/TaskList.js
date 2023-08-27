import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskServices";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log("response", err);
      });
  }, []);
  return (
    <section className="task-list">
      <h3>Task List</h3>

      <ul>
        <li>
          <div className="task-info">
            <h4>Title: Eat well</h4>
            <button>Status</button>

            <div>
              <button>View</button>
              <button>delete</button>
              <button>Edit</button>
            </div>
          </div>
          <p>
            Description: Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Doloribus quam voluptas
          </p>
        </li>
      </ul>
    </section>
  );
};

export default TaskList;
