import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  render() {
    var task = this.props.task;
    if (task != null) {
      var eleTask = task.map((task, index) => {
        return (
          <TaskItem
            key={task.id}
            index={index}
            task={task}
            onUpdateStatus={this.props.onUpdateStatus}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
          />
        );
      });
    }

    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input type="text" className="form-control" />
                </td>
                <td>
                  <select className="form-control">
                    <option value={-1}>All</option>
                    <option value={0}>Hidden</option>
                    <option value={1}>Activated</option>
                  </select>
                </td>
                <td />
              </tr>
              {eleTask}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TaskList;
