import React from "react";

const Card = (props) => {
  return (
    <div
      style={{
        width: 270,
        paddingRight: 30,
        float: "left",
      }}
    >
      <div className="card" style={{ borderRadius: "20px", border: "10px" }}>
        <div className="card-image" style={{ width: 240 }}>
          <img
            alt={props.payload.fields.header.stringValue}
            src={props.payload.fields.image.stringValue}
            style={{
              borderTopRightRadius: "20px",
              borderTopLeftRadius: "20px",
              border: "10px",
            }}
          />
        </div>
        <div className="card-content">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.payload.fields.link.stringValue}
          >
            {props.payload.fields.header.stringValue}
          </a>
          <p>{props.payload.fields.description.stringValue}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
