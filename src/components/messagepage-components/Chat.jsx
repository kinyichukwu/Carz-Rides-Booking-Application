import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../../contexts/ChatContext";
import { useUser } from "../../contexts/UserContext";
import { database } from "../../firebaseConfig";
import { getLastChatTime } from "../../helpers/chatTime";
import ChatMessage from "./ChatMessage";
import NoChatFound from "./components/NoChatFound";
import MessageClipLoader from "./MessageClipLoader";
import userImage from "../../assets/profile_icon.svg";

function Chat() {
  let displayNone = "";
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  const {
    chatOpen,
    foundUser,
    setFoundUser,
    chatId,
    setChatId,
    userData,
    setUserData,
  } = useContext(ChatContext);

  if (chatOpen) {
    displayNone = "displayNoneForMobile";
  }

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(database, "userChats", user?.uid), (doc) => {
        setChats(doc.data());
        setLoading(false);
      });

      return () => {
        unsub();
      };
    };

    user?.uid && getChats();
  }, [user?.uid]);

  // getting user details
  useEffect(() => {
    Object.entries(chats).map(async (chat) => {
      const q = query(
        collection(database, "usersList"),
        where("uid", "==", chat[1]?.userInfo?.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserData((prev) => ({
            ...prev,
            [chat[1].userInfo.uid]: doc.data(),
          }));
        });
      });
    });
  }, [chats.length]);

  // setting unread chats back to unread
  const setReadMessages = async (id) =>
    await updateDoc(doc(database, "userChats", user?.uid), {
      [id + ".lastMessage"]: {
        unRead: 0,
      },
    });

  const handleSelect = (u, idx) => {
    setFoundUser(u.userInfo);
    setReadMessages(idx);
  };

  return (
    <div className={"messagepage--chat  " + displayNone}>
      {/**header */}
      <div className="header">
        <h1>Chats </h1>
        {"  "}
        <span></span>
      </div>
      {/**chat */}
      <div className="chat ">
        {loading ? (
          <MessageClipLoader />
        ) : chats.length === 0 || Object.keys(chats).length === 0 ? (
          <NoChatFound />
        ) : (
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => {
              return (
                <Fragment key={chat[0]}>
                  <Link to={`chats/${chat[0]}`}>
                    <div
                      className="chat--i "
                      onClick={() => handleSelect(chat[1], chat[0])}
                    >
                      <div className="image">
                        <img
                          src={
                            userData[chat[1]?.userInfo?.uid]?.profilePic ||
                            userImage
                          }
                          alt="fff"
                        />
                      </div>

                      <div
                        className={`message ${
                          chat[1]?.lastMessage?.unRead ? "  unread" : " "
                        }`}
                      >
                        <h2>
                          {userData[chat[1]?.userInfo?.uid]?.fullName ||
                            chat[1]?.userInfo?.fullName}
                          {/**driver && <span> (Driver)</span>*/}
                        </h2>

                        <p>
                          {/**person.lastMessage().sent && <span>Me: {"  "}</span>*/}
                          {chat[1]?.lastMessage?.text}
                        </p>
                      </div>
                      <div className="span">
                        {chat[1]?.lastMessage?.unRead > 0 && (
                          <p className="num">{chat[1]?.lastMessage?.unRead} </p>
                        )}

                        <p className="time">
                          {getLastChatTime(
                            new Date(chat[1]?.date?.seconds * 1000)
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <hr />
                </Fragment>
              );
            })
        )}

        <ChatMessage />
      </div>
    </div>
  );
}

export default Chat;
