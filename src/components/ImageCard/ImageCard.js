import React from "react";
import "./ImageCard.css";

const ImageCard = props => (
  <div className="card">
    <span onClick={() => props.setClicked(props.id)}>
        <div className="img-container">
        <img alt={props.name} src={props.url} height='250px' width='250px' />
        </div>
    </span>
  </div>
);

export default ImageCard;