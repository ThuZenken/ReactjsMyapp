import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group SetMb">
          <input
            type="text"
            className="form-control"
            placeholder="Keyword..."
          />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button">
              <span className="fa fa-search mr-5" />
              Search
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
