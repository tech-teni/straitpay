import React, { useEffect, useState } from "react";
import {
  getTasksService,
  deleteTaskService,
  viewTaskService,
} from "../services/taskServices";
import { useNavigate, useLocation } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoader(true);

    getTasksService()
      .then((res) => {
        console.log("response", res);
        if (res.status) {
          setTasks(res.data);
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
        console.log("del", res);
        if (res.status) {
          setMessage(res.msg);
        } else {
          setMessage(res.msg);
        }
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => {
        setLoader(false);
        setMessage("An error occur");

        console.log("response", err);
      });
  };

  return (
    <section className="task-list">
      <h3>Tasks</h3>
      {message && (
        <p className="delete" style={{ textAlign: "center" }}>
          {message}
        </p>
      )}
      <ul>
        {tasks.length > 0 &&
          tasks.map((each) => {
            return (
              <li key={each._id}>
                <div className="task-info">
                  <div className="task-title">
                    <h4>{each.title}</h4>{" "}
                    <button
                      className="status"
                      style={{
                        backgroundColor: each.isCompleted
                          ? "#137a61"
                          : "#919493",
                      }}
                    >
                      {each.isCompleted ? "Completed" : "Uncompleted"}
                    </button>
                  </div>

                  <div className="task-button-action">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/view/${each._id}`);
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/view/${each._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteTask(each._id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
                <p>{each.description}</p>
              </li>
            );
          })}
      </ul>
      {loader && (
        <div className="null">
          <img src="./images/loader.gif" alt="" />
        </div>
      )}

      {tasks.length == 0 && loader === false && (
        <div className="null">
          <img src="./images/null.jpeg" alt="" />
          <p>No Task added</p>
        </div>
      )}
    </section>
  );
};

export default TaskList;
