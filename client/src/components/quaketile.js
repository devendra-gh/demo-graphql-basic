import React from "react";

import "./style.css";

const QuakeTile = ({ id, magnitute, location, when }) => {
  return (
    <div className="quaketile">
      <h3>Quakes: {id}</h3>
      <p>Location: {location}</p>
      <p>Magnitute: {magnitute}</p>
      <p>When: {when}</p>
    </div>
  );
};

export default QuakeTile;
