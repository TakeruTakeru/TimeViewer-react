import React, { Component } from "react";
import "../style/loading.css";

export default class Loading extends Component {
  render() {
    return (
      <div className="load-wrapper">
        <div className="loader">
          <span>Loading</span>
        </div>
      </div>
    );
  }
}

