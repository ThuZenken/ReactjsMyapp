import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "false" ? false : true;
    }
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };
  onCloseForm = () => {
    this.props.onCloseForm();
  };

  Cancel = () => {
    this.props.onCancel();
  };
  render() {
    var { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <div className="row">
            <div className="iconClose">
              <span
                className="fa fa-times-circle"
                onClick={this.onCloseForm}
              ></span>
            </div>
            <div className="text-left">
              <h3 className="panel-title">
                {id !== "" ? "Update Task" : "Add Task"}
              </h3>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                placeholder="Name"
              />
            </div>
            <label>Status :</label>
            <select
              className="form-control"
              required="required"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Activited</option>
              <option value={false}>Hidden</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-success">
                Add
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.Cancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
