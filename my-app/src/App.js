import React, { Component } from "react";
import "./App.css";
import TaskForm from "./Components/TaskForm";
import Control from "./Components/Control";
import TaskList from "./Components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
    };
  }

  //componetWillMount
  componentWillMount() {
    if (localStorage && localStorage.getItem) {
      var task = JSON.parse(localStorage.getItem("task"));
      this.setState({
        task: task,
      });
    }
  }

  //GenerateData
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

  //RandomId
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  //RandomId
  GennerateID() {
    return this.s4() + this.s4() + "-" + this.s4();
  }
  //Alert confirm
  alConfirm = (_title, _message, callback) => {
    if (callback == null || callback === undefined) {
      swal({
        title: _title,
        text: _message,
        buttons: {
          confirm: "Ok",
          cancel: "Cancel",
        },
      });
      return;
    }

    swal({
      title: _title,
      text: _message,
      buttons: {
        confirm: "Ok",
        cancel: "Cancel",
      },
    }).then(function (e) {
      callback(e);
    });
  };

  //openToggleAdd
  onToggleForm = () => {
    this.setState({
      isDisplayForm: true,
      taskEditing: null,
    });
  };

  //openToggleEdit
  onToggleFormEdit = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  //CloseToggle
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onCancel = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: "",
    });
  };

  //SubmitForm
  onSubmit = (data) => {
    var { task } = this.state;
    var idFirst = data.id;
    if (data.id === "") {
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
    if (idFirst === "") {
      toast.success("Add Task Success");
    } else {
      toast.success("Update Task Success");
    }
  };

  //update Status
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

  //Remove Task
  onDelete = (id) => {
    var { task } = this.state;
    var task1;
    this.alConfirm(
      "Delete Task",
      "Are you sure want to delete the Task？",
      function (e) {
        if (e) {
          var index = -1;
          task.forEach((task, ele) => {
            if (task.id === id) {
              index = ele;
            }
          });

          if (index !== -1) {
            task.splice(index, 1);
            toast.success("Remove Task Success");
          }
          localStorage.setItem("task", JSON.stringify(task));
          setTimeout(function () {
            window.location.href = "./index.html";
          }, 3000);
        }
        return task;
      }
    );
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
    this.onToggleFormEdit();
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });

    console.log(keyword);
  };
  render() {
    var { task, isDisplayForm, taskEditing, filter, keyword } = this.state;

    if (filter) {
      if (filter.name) {
        task = task.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      task = task.filter((task) => {
        if (filter.status === 0 || filter.status === 1) {
          return task.status === (filter.status === 1 ? true : false);
        } else {
          return task;
        }
      });
      if (keyword) {
        task = task.filter((task) => {
          return task.name.toLowerCase().indexOf(keyword) !== -1;
        });
      }
    }

    var elmTaskForm = isDisplayForm ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
        onCancel={this.onCancel}
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
            <Control onSearch={this.onSearch} />
            {/* <swal /> */}
            <TaskList
              task={task}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFilter={this.onFilter}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
