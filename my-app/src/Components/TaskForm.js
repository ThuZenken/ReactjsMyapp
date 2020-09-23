import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: false,
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  render() {
    return (
      <div className="panel panel-warning ">
        <div className="panel-heading">
          <div className="row">
            <div className="iconClose">
              <span
                className="fa fa-times-circle"
                onClick={this.onCloseForm}
              ></span>
            </div>
            <div className="text-left">
              <h3 className="panel-title">Add Task</h3>
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
              <option value={1}>Activited</option>
              <option value={0}>Hidden</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-success">
                Add
              </button>
              &nbsp;
              <button type="submit" className="btn btn-danger">
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
