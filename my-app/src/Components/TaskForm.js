import React, { Component } from "react";

class TaskForm extends Component {
  render() {
    return (
      <div className="panel panel-warning ">
        <div className="panel-heading">
          <h3 className="panel-title">Add Task</h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Name :</label>
              <input type="text" className="form-control" />
            </div>
            <label>Status :</label>
            <select className="form-control" required="required">
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
