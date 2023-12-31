import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <h1
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Strait<span>Pay</span>{" "}
      </h1>

      <button>Todo App</button>
    </header>
  );
};

export default Header;
