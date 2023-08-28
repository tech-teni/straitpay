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
    <section className="task-list">
      <h3>Tasks</h3>

      <ul>
        {tasks &&
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

                  <div className="taskn-button-actio">
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

      {tasks === false && <img src="" alt="" />}
    </section>
  );
};

export default TaskList;
