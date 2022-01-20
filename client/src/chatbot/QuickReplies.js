import React, { Component } from "react";
import QuickReply from "./QuickReply";

class QuickReplies extends Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(event, payload, text) {
    this.props.replyClick(event, payload, text);
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this._handleClick} reply={reply} />;
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i);
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div
        className="col s12 m8 offset-m2 l6 offset-l3"
        style={{ margin: "15px" }}
      >
        <div
          className="card-panel grey lighten-5 z-depth-1"
          style={{ borderRadius: "20px", border: "10px" }}
        >
          <div className="row valign-wrapper">
            <div className="col s2">
              <a
                target="_blank"
                href="https://www.qut.edu.au/research/study-with-us/student-topics/topics/text-analysis-for-engineering-education"
                className="btn-floating btn-large waves-effect waves-light blue darken-4"
              >
                QT
              </a>
            </div>
            <div
              id="quick-replies"
              className="col s10"
              style={{ marginLeft: "1em" }}
            >
              {this.props.text && <p>{this.props.text.stringValue}</p>}
              {this.renderQuickReplies(this.props.payload)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickReplies;
