import React from "react";
import shortid from "shortid";

import Task from "./Task";

const Stage = ({ name, stageId, tasks, onPressTaskCard }) => {
  return (
    <div
      data-testid={`stage-${stageId}`}
      style={{
        flexGrow: 1,
        margin: "1rem",
        paddingBottom: "1rem",
        background: "#fafafa"
      }}
    >
      <h2>{name}</h2>
      <div>
        {tasks.map(task => (
          <Task
            key={shortid.generate()}
            task={task}
            onPressTaskCard={onPressTaskCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
