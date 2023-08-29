import React, { lazy, useEffect, useState } from "react";
import { editTaskService, viewTaskService } from "../services/taskServices";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const EditTaskModel = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState(false);

  const [inputValidator, setInputValidator] = useState("");

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [response, setResponse] = useState("success");
  const [task, setTask] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);

    viewTaskService(id)
      .then((res) => {
        console.log("response", res);
        // if (res.status) {
        //   setTask(res.data);
        // } else {
        //   setResponseMessage(res.msg);
        //   setResponse("failed");
        // }
        setTitle(res.data.title);
        setDescription(res.data.description);
        setStatus(res.data.isCompleted);
        setDefaultStatus(res.data.isCompleted);
        setLoader(false);
      })
      .catch((err) => {
        console.log("response", err);
        setLoader(false);
        setResponseMessage("An error occured");
        setResponse("failed");
      });
  }, []);

  let editTask = () => {
    let payload = {
      title: title,
      description: description,
      isCompleted: status,
    };
    if (description === "") {
      setInputValidator("Description must not be empty");
    }
    if (title === "") {
      setInputValidator("Title must not be empty");
    }
    console.log("payload", payload);
    if (title && description) {
      setLoading(true);

      editTaskService(payload, id)
        .then((res) => {
          setLoading(false);
          console.log("response", res);
          if (res.status) {
            setResponse("success");
            setResponseMessage(res.msg);
          } else {
            setResponse("failed");
            setResponseMessage(res.msg);
          }
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          setLoading(false);

          console.log("response", err);
        });
    }
  };
  return (
    <section className="create-task-bar">
      <form>
        <h1>Edit task</h1>
        {inputValidator && <p>{inputValidator}</p>}

        <div className="input-container">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="status-dropdown">
          {" "}
          <label htmlFor="Title">Is completed?</label>
          <select
            onChange={(e) => {
              e.preventDefault();
              console.log(e);
              setStatus(e.target.value);
            }}
          >
            <option value={status}>{String(defaultStatus)}</option>
            {console.log(status)}

            <option value={!status}>{String(!defaultStatus)}</option>
          </select>
        </div>
        {/* <div>
          <label htmlFor="Title">Status</label>

          <select>
            <option>completed</option>
          </select>
        </div> */}

        <div className="input-container">
          <textarea
            rows="4"
            cols="50"
            required
            placeholder="Description"
            value={description}
            onChange={(e) => {
              e.preventDefault();
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        {responseMessage && (
          <div
            className="reponse"
            style={{
              color: response === "success" ? "#137a61" : "#b34747",
            }}
          >
            {responseMessage}
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            editTask();
            console.log("hello");
          }}
        >
          {loading ? (
            <img src="../images/load.gif" alt="loader" className="loader" />
          ) : (
            "Update"
          )}
        </button>
      </form>
    </section>
  );
};

export default EditTaskModel;
