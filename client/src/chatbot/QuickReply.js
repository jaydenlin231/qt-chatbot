import React from "react";

const QuickReply = (props) => {
  if (props.reply.structValue.fields.payload) {
    return (
      <a
        style={{ margin: 3 }}
        href=""
        className="waves-effect waves-light btn-small blue darken-4"
        onClick={(event) => {
          props.click(
            event,
            props.reply.structValue.fields.payload.stringValue,
            props.reply.structValue.fields.text.stringValue
          );
        }}
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
    );
  } else {
    return (
      <a
        style={{ margin: 3 }}
        href={props.reply.structValue.fields.link.stringValue}
        className="waves-effect waves-light btn-small blue darken-4"
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
    );
  }
};

export default QuickReply;
