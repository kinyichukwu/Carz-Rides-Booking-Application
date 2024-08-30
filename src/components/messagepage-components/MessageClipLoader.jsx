import React from "react";
import { ClipLoader } from "react-spinners";

const MessageClipLoader = () => {
  return (
    <div className="noChatFound">
      <ClipLoader size={85} color="red"/>
    </div>
  );
};

export default MessageClipLoader;
