import React, { lazy, useEffect, useState } from "react";
import { createTasksService } from "../services/taskServices";
import TextField from "@mui/material/TextField";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [response, setResponse] = useState("success");
  const [inputValidator, setInputValidator] = useState("");

  let createTask = () => {
    let payload = {
      title: title,
      description: description,
      isCompleted: false,
    };

    console.log("payload", payload);
    if (description === "") {
      setInputValidator("Description must not be empty");
    }
    if (title === "") {
      setInputValidator("Title must not be empty");
    }

    if (title && description) {
      setLoading(true);
      createTasksService(payload)
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
          }, 2000);
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
        <h1>Create a task</h1>
        {inputValidator && <p>{inputValidator}</p>}
        <div className="input-container">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            required
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
              setInputValidator("");
            }}
          />
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
              setInputValidator("");

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
            createTask();
          }}
        >
          {loading ? (
            <img src="./images/load.gif" alt="loader" className="loader" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
      {/* <div className="quotes">
        <h1>Make Hay while teh sun shines</h1>
      </div> */}
    </section>
  );
};

export default CreateTask;
