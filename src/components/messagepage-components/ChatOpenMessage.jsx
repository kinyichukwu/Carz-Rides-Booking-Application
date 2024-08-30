
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { database } from "../../firebaseConfig";


function ChatOpenMessage({ chat, sent, img }) {

  const { user } = useUser();
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

 

 

  return (
    <div
      className={sent ? "ChatOpenMessage " : "ChatOpenMessage sent"}
      ref={ref}
    >
    {img ? <img src={img} alt="" /> : <p>{chat}</p>}

    </div>
  );
}

export default ChatOpenMessage;
