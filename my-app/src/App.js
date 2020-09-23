import React, { Component } from "react";
import "./App.css";
import TaskForm from "./Components/TaskForm";
import Control from "./Components/Control";
import TaskList from "./Components/TaskList";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      isDisplayForm: false,
      taskEditing: null,
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem) {
      var task = JSON.parse(localStorage.getItem("task"));
      this.setState({
        task: task,
      });
    }
  }
  GenerateData = () => {
    var task = [
      {
        id: this.GennerateID(),
        name: "Programing",
        status: false,
      },
      {
        id: this.GennerateID(),
        name: "Programing2",
        status: false,
      },
      {
        id: this.GennerateID(),
        name: "Programing3",
        status: true,
      },
    ];
    this.setState({
      task: task,
    });
    localStorage.setItem("task", JSON.stringify(task));
  };

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  GennerateID() {
    return this.s4() + this.s4() + "-" + this.s4();
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onSubmit = (data) => {
    var { task } = this.state;
    if (data === "") {
      data.id = this.GennerateID();
      task.push(data);
    }
    var index = this.findIndex(data.id);
    task[index] = data;
    this.setState({
      task: task,
    });
    localStorage.setItem("task", JSON.stringify(task));
    this.setState({
      isDisplayForm: false,
      taskEditing: null,
    });
  };

  onUpdateStatus = (id) => {
    var { task } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      task[index].status = !task[index].status;

      this.setState({
        task: task,
      });

      localStorage.setItem("task", JSON.stringify(task));
    }
  };

  onDelete = (id) => {
    var { task } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      task.splice(index, 1);
      this.setState({
        task: task,
      });

      localStorage.setItem("task", JSON.stringify(task));
    }
  };

  findIndex = (id) => {
    var result = -1;
    var { task } = this.state;
    task.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };
  onUpdate = (id) => {
    var { task } = this.state;
    var index = this.findIndex(id);
    this.setState({
      taskEditing: task[index],
    });
    this.onToggleForm();
  };
  render() {
    var { task, isDisplayForm, taskEditing } = this.state;
    var elmTaskForm = isDisplayForm ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Task Manager</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <div className="SetMb">
              <button
                type="button"
                className="btn btn-primary mb-5 mr-5"
                onClick={this.onToggleForm}
              >
                <span className="fa fa-plus mr-5" />
                Add Task
              </button>
              {/* <button
                type="button"
                className="btn btn-danger mb-5 mr-5"
                onClick={this.GenerateData}
              >
                GenerateData
              </button> */}
            </div>
            <Control />
            <TaskList
              task={task}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
