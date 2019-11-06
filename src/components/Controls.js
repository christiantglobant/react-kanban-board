import React, { Component } from "react";

class Controls extends Component {
  constructor(props) {
    super(props);
    // Bind 'this' context to callback functions
    this.onPressMoveTaskButton = this.onPressMoveTaskButton.bind(this);
    this.onChangeNewTaskNameInput = this.onChangeNewTaskNameInput.bind(this);
    this.onPressCreateTaskButton = this.onPressCreateTaskButton.bind(this);
    this.onPressDeleteButton = this.onPressDeleteButton.bind(this);
    // Initial State for component
    this.state = { newTaskInputValue: "" };
  }

  // Check if field is really empty without count blank spaces
  isEmptyField(field) {
    return !field.trim().length;
  }

  // Execute this function when press move forward or move back button
  onPressMoveTaskButton({ isBack = false } = {}) {
    const { onMoveTask } = this.props;
    if (onMoveTask) onMoveTask(isBack);
  }

  // Change state when user write on input for create a new task
  onChangeNewTaskNameInput(event) {
    this.setState({ newTaskInputValue: event.target.value });
  }

  // Clean current state and create a new task in board
  onPressCreateTaskButton() {
    const { onCreateNewTask } = this.props;
    const { newTaskInputValue } = this.state;
    this.setState({ newTaskInputValue: "" }, () => {
      if (onCreateNewTask) onCreateNewTask(newTaskInputValue);
    });
  }

  // Delete current selected task in app state
  onPressDeleteButton(currentTask) {
    const { onDeleteTask } = this.props;
    if (onDeleteTask) onDeleteTask(currentTask);
  }

  render() {
    const {
      isEmptyField,
      onPressMoveTaskButton,
      onChangeNewTaskNameInput,
      onPressCreateTaskButton,
      onPressDeleteButton
    } = this;
    const { selectedTask, numberOfStages } = this.props;
    const { newTaskInputValue } = this.state;
    return (
      <div style={{ padding: "1rem", background: "#D6F3FF" }}>
        <h1>Controls</h1>
        <div style={{ display: "flex" }}>
          <input
            value={newTaskInputValue}
            onChange={onChangeNewTaskNameInput}
            placeholder="New task name"
            style={{ fontSize: "1rem" }}
            data-testid="new-task-name-input"
          />
          <button
            onClick={onPressCreateTaskButton}
            style={{ marginLeft: "1rem" }}
            disabled={isEmptyField(newTaskInputValue)}
            data-testid="create-task-btn"
          >
            Create
          </button>
        </div>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <input
            readOnly
            placeholder="Selected task name"
            style={{ fontSize: "1rem" }}
            data-testid="selected-task-field"
            value={selectedTask.name || ""}
          />
          <button
            style={{ marginLeft: "1rem" }}
            disabled={!selectedTask.name || selectedTask.stage === 0}
            onClick={() => onPressMoveTaskButton({ isBack: true })}
            data-testid="move-back-btn"
          >
            Move back
          </button>
          <button
            style={{ marginLeft: "1rem" }}
            disabled={
              !selectedTask.name || selectedTask.stage === numberOfStages
            }
            data-testid="move-forward-btn"
            onClick={() => onPressMoveTaskButton()}
          >
            Move forward
          </button>
          <button
            onClick={() => onPressDeleteButton(selectedTask)}
            style={{ marginLeft: "1rem" }}
            disabled={!selectedTask.name}
            data-testid="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Controls;
