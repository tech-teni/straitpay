import React from "react";
import Skeleton from "@mui/material/Skeleton";

const TaskSkeleton = () => {
  return (
    <li style={{ boxShadow: "none" }}>
      <div className="task-info">
        <div className="task-title">
          <Skeleton variant="rectangular" width={100} height={20} />

          <Skeleton variant="rectangular" width={150} height={20} />
        </div>

        <div className="taskn-button-actio">
          <Skeleton variant="rectangular" width={100} height={20} />
        </div>
      </div>
      <Skeleton variant="rectangular" width={100} height={20} />
    </li>
  );
};

export default TaskSkeleton;
