import React from "react";
import shortid from "shortid";

import Stage from "./Stage";

const Board = ({ stagesNames, stagesTasks, onPressTaskCard }) => {
  return (
    <div>
      <h1>Kanban board</h1>
      <div
        style={{
          display: "flex"
        }}
      >
        {stagesTasks.map((tasks, idx) => (
          <Stage
            stageId={idx}
            key={shortid.generate()}
            name={stagesNames[idx]}
            tasks={tasks}
            onPressTaskCard={onPressTaskCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
