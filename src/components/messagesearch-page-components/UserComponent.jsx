import React from "react";
import { Link } from "react-router-dom";
import userImage from "../../assets/profile_icon.svg";

const UserComponent = ({ name, onClick, searchUserData }) => {
  return (
    <Link to={`/messages`}>
      <div className="chat--i" onClick={onClick}>
        <div className="image">
          <img src={searchUserData?.profilePic || userImage} alt="fff" />
        </div>

        <div className="message unread">
          <h2>{name}</h2>
          <p></p>
        </div>
        <div className="span">
          <p className="">Friend</p>
        </div>
      </div>
    </Link>
  );
};

export default UserComponent;
