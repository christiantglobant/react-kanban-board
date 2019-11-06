import React from "react";

const taskNameToId = name => {
  return `task-${name}`;
};

const Task = ({ task, onPressTaskCard }) => {
  return (
    <div
      style={{
        padding: "1rem",
        cursor: "pointer",
        border: "1px solid #ccc",
        margin: "1rem 1rem 0 1rem"
      }}
      data-testid={taskNameToId(task.name)}
      onClick={() => onPressTaskCard(task)}
    >
      {task.name}
    </div>
  );
};

export default Task;
