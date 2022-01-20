import React from "react";

const Message = (props) => {
  return (
    <div className="col s12 m8 offset-m2 offset-l3" style={{ margin: "15px" }}>
      <div
        className="card-panel grey lighten-5 z-depth-1"
        style={{ borderRadius: "20px", border: "10px" }}
      >
        <div className="row valign-wrapper">
          {props.speaks === "bot" && (
            <div className="col s2">
              <a
                target="_blank"
                className="btn-floating btn-large waves-effect waves-light blue darken-4"
                href="https://www.qut.edu.au/research/study-with-us/student-topics/topics/text-analysis-for-engineering-education"
              >
                QT
              </a>
            </div>
          )}
          <div className="col s10" style={{ marginLeft: "1em" }}>
            <span className="black-text">{props.text}</span>
          </div>
          {props.speaks === "me" && (
            <div className="col s2" style={{ marginRight: "1em" }}>
              <a
                className="btn-floating btn-large waves-effect waves-light grey"
                href="/#"
              >
                ME
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
