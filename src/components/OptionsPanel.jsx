import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../contexts/DataContext";
import { useUser } from "../contexts/UserContext";
import { auth } from "../firebaseConfig";

const OptionsPanel = ({showOptions, setShowOptions}) => {
  const { setUser, navigate } = useUser();
  const {setUserInfo} = useUserData()

  const signOutUser = async () => {
    setUser(null);
    await signOut(auth);
    localStorage.removeItem("rajloUser");
    navigate("/signin");
    setUserInfo({});
  };

  const hidePanel = ()=>{
    if(showOptions === true){
      setShowOptions(false)
    }
  }

  return (
    <div className="options-container">
      <p onClick={()=>{
          hidePanel()
        }}>
        <Link  to="/profile">View Profile</Link>
      </p>
      <p onClick={()=>{
          hidePanel()
          signOutUser()
        }
        }>Logout</p>
    </div>
  );
};

export default OptionsPanel;
