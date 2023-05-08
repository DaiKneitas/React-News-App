import React from "react";
import loadingImage from "../../components/Images/loading.gif";

function Spinner() {
  return (
    <div className="spinner">
      <img src={loadingImage} alt="Loading..." />
    </div>
  );
}

export default Spinner;
