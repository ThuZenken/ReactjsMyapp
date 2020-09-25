import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: "name",
        value: 1,
      },
    };
  }

  onClick = (sortBy, sortValue) => {
    this.setState = {
      sort: {
        by: sortBy,
        value: sortValue,
      },
    };
    console.log(this.state);
  };
  render() {
    var { sort } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sort <span className="fa fa-caret-square-o-down ml-5" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this.onClick("name", 1)}>
              <a
                role="button"
                className={
                  sort.sortBy === "name" && sort.sortValue === 1
                    ? "fa fa-check"
                    : ""
                }
              >
                <span className="fa fa-sort-alpha-asc pr-5">Name A-Z</span>
              </a>
            </li>
            <li onClick={() => this.onClick("name", -1)}>
              <a
                role="button"
                className={
                  sort.sortBy === "name" && sort.sortValue === -1
                    ? "fa fa-check"
                    : ""
                }
              >
                <span className="fa fa-sort-alpha-desc pr-5">Name Z-A</span>
              </a>
            </li>
            <li role="separator" className="divider" />
            <li onClick={() => this.onClick("status", 1)}>
              <a
                role="button"
                className={
                  sort.sortBy === "status" && sort.sortValue === 1
                    ? "fa fa-check"
                    : ""
                }
              >
                Status Activited
              </a>
            </li>
            <li onClick={() => this.onClick("status", -1)}>
              <a
                role="button"
                className={
                  sort.sortBy === "status" && sort.sortValue === -1
                    ? "fa fa-check"
                    : ""
                }
              >
                Status Hidden
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
