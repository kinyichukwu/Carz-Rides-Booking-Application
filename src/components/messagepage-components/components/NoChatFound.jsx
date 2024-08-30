import React from "react";
import { Link } from "react-router-dom";

const NoChatFound = () => {
  return (
    <div className="noChatFound">
      <Link to="/message-search">
        <h2> No chat found click to search for a user </h2>
      </Link>
    </div>
  );
};

export default NoChatFound;
