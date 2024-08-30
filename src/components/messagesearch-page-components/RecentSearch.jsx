import React from "react";
import UserComponent from "./UserComponent";

const RecentSearch = ({ recentUsers }) => {
  return (
    <div className="chat ">
      {recentUsers?.map((user) => (
        <UserComponent name={user.fullName} searchUserData={user} />
      ))}
    </div>
  );
};

export default RecentSearch;
