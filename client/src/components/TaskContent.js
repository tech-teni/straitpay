import React, { useEffect, useState } from "react";
import { getTasksService } from "../services/taskServices";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTaskService, viewTaskService } from "../services/taskServices";

const TaskContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);

    viewTaskService(id)
      .then((res) => {
        console.log("response", res);
        if (res.status) {
          setTask(res.data);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log("response", err);
        setLoader(false);
      });
  }, []);

  let deleteTask = () => {
    setLoader(true);

    deleteTaskService(id)
      .then((res) => {
        setLoader(false);
        console.log("response", res);
        // if (res.status) {
        //   setResponse("success");
        //   setResponseMessage(res.msg);
        // } else {
        //   setResponse("failed");
        //   setResponseMessage(res.msg);
        // }
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5);
      })
      .catch((err) => {
        setLoader(false);

        console.log("response", err);
      });
  };

  return (
    <section className="task-list each-task">
      <ul>
        <li key={task._id} style={{ boxShadow: "none" }}>
          <div className="task-info">
            <div className="task-title">
              <h4>{task.title}</h4>{" "}
              <button
                className="status"
                style={{
                  backgroundColor: task.isCompleted ? "#137a61" : "#919493",
                }}
              >
                {task.isCompleted ? "Completed" : "Uncompleted"}
              </button>
            </div>

            <div className="taskn-button-actio">
              <button
                onClick={() => {
                  deleteTask();
                }}
              >
                delete
              </button>
            </div>
          </div>
          <p>{task.description}</p>
        </li>
      </ul>

      {/* {tasks.length === 0 && <img src="" alt="" />} */}
    </section>
  );
};

export default TaskContent;
