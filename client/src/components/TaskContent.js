import React, { useEffect, useState } from "react";
import { getTasksService } from "../services/taskServices";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTaskService, viewTaskService } from "../services/taskServices";
import TaskSkeleton from "./TaskSkeleton";

const TaskContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState([]);
  const [loader, setLoader] = useState(true);
  const [deletMessage, setDeleteMesage] = useState("");

  useEffect(() => {
    setLoader(true);

    viewTaskService(id)
      .then((res) => {
        console.log("response", res);
        if (res.status) {
          setTask(res.data);
          console.log(res.data);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log("response", err);
        setLoader(false);
      });
  }, []);

  let deleteTask = (id) => {
    setLoader(true);

    deleteTaskService(id)
      .then((res) => {
        setLoader(false);
        console.log("response", res);
        if (res.status) {
          setDeleteMesage(res.msg);
        } else {
          setDeleteMesage(res.msg);
        }
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((err) => {
        setLoader(false);

        console.log("response", err);
      });
  };

  return (
    <section className="task-list each-task">
      {console.log(task === true)}
      {deletMessage && (
        <p className="delete" style={{ textAlign: "center" }}>
          {deletMessage}
        </p>
      )}
      {!loader && (
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
                    deleteTask(task._id);
                  }}
                  className="delete"
                >
                  delete
                </button>
              </div>
            </div>
            <p>{task.description}</p>
          </li>
        </ul>
      )}

      {loader && <TaskSkeleton />}
    </section>
  );
};

export default TaskContent;
