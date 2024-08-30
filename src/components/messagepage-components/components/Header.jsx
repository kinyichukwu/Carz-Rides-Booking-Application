import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";
import userImage from "../../../assets/profile_icon.svg";
import { ChatContext } from "../../../contexts/ChatContext";
import { getLastChatTimeAsString , getLastChatTime} from "../../../helpers/chatTime";

const Header = ({}) => {
  const { foundUser, userData } = useContext(ChatContext);

  return (
    <div className="header">
      {" "}
      <div className={"chat--i "}>
        <div className="image">
          <img
            src={userData[foundUser?.uid]?.profilePic || userImage}
            alt="profile Image"
          />
        </div>

        <div className="message unread">
          <h2>
            {userData[foundUser?.uid]?.fullName || "Loading..."}{" "}
            {userData?.driver && <span>(Driver)</span>}
          </h2>

          <p>
            {userData[foundUser?.uid]?.lastLoginTime === undefined
              ? " "
              :
              getLastChatTimeAsString(
                  new Date(
                    userData[foundUser?.uid]?.lastLoginTime?.seconds * 1000
                  )
                )}
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default Header;
