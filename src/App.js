import React, { Component } from "react";
import "./App.css";

import Controls from "./components/Controls";
import Board from "./components/Board";

const NUM_STAGES = 4;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: "task 0", stage: 0 },
        { name: "task 1", stage: 0 },
        { name: "task 2", stage: 0 },
        { name: "task 3", stage: 0 },
        { name: "task 4", stage: 1 },
        { name: "task 5", stage: 1 },
        { name: "task 6", stage: 1 },
        { name: "task 7", stage: 2 },
        { name: "task 8", stage: 2 },
        { name: "task 9", stage: 3 }
      ],
      selectedTask: {}
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
    // Bind 'this' context to callback functions
    this.onPressTaskCard = this.onPressTaskCard.bind(this);
    this.onMoveTask = this.onMoveTask.bind(this);
    this.onCreateNewTask = this.onCreateNewTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
  }

  // Create a new object in tasks array
  onCreateNewTask(name, stage = 0) {
    const newTask = { name, stage };
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask]
    }));
  }

  // Delete a task in tasks array from state component
  onDeleteTask(task) {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(
        prevTask => prevTask.name !== prevState.selectedTask.name
      ),
      selectedTask: {}
    }));
  }

  // Set current task selected in array from state component
  onPressTaskCard(task) {
    this.setState({ selectedTask: task });
  }

  // Move tasks into a new stage, can be back or forward
  onMoveTask(isBack) {
    const { tasks, selectedTask } = this.state;
    const { stage: currentStage, name: currentTaskName } = selectedTask;
    const newTasks = tasks.filter(task => task.name !== currentTaskName);
    const newStage = isBack ? currentStage - 1 : currentStage + 1;
    const newSelectedTask = { ...selectedTask, stage: newStage };
    newTasks.push(newSelectedTask);
    this.setState({ tasks: newTasks, selectedTask: newSelectedTask });
  }

  render() {
    const { onPressTaskCard, onMoveTask, onCreateNewTask, onDeleteTask } = this;
    const { tasks, selectedTask } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < NUM_STAGES; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="App">
        <Controls
          selectedTask={selectedTask}
          numberOfStages={NUM_STAGES - 1}
          onMoveTask={onMoveTask}
          onCreateNewTask={onCreateNewTask}
          onDeleteTask={onDeleteTask}
        />
        <Board
          stagesTasks={stagesTasks}
          stagesNames={this.stagesNames}
          onPressTaskCard={onPressTaskCard}
        />
      </div>
    );
  }
}

export default App;
