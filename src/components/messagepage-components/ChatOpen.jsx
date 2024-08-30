import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatOpenMessage from "./ChatOpenMessage";
import { ChatContext } from "../../contexts/ChatContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import Input from "./Input";
import { useUser } from "../../contexts/UserContext";
import Header from "./components/Header";

function ChatOpen() {
  const { chatOpen, setChatOpen, foundUser, chatId, setChatId } =
    useContext(ChatContext);
  const { user } = useUser();
  const [messages, setMessages] = useState([]);



  // use id in url
  const { id } = useParams();
 
  // find chat
  const data = id ? foundUser : undefined;
  // set the display in mobile if url changes data is fetched

  useEffect(() => {
    if (data) {
      setChatOpen(true);
    } else {
      setChatOpen(false);
    }
    if (id) {
      setChatId(id);
    }
  }, [id]);
  // fetch messages
  // setting unread chats back to unread
  const setReadMessages = async (id) => {
    if (id !== null && id !== undefined && id?.length !== 0) {
      await updateDoc(doc(database, "userChats", user.uid), {
        [id + ".lastMessage.unRead"]: 0,
      });
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(database, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  useEffect(() => {

    return () => {
      setReadMessages(id);
    };
  }, [messages.length]);

  let displayNone = "displayNoneForMobileOpen";
  if (!data) {
    return <div className={"messagepage--chat--open " + displayNone}></div>;
  }

  return (
    <div className={"messagepage--chat--open"}>
      <Header />

      {/** individual chat */}

      <div className="ind-chat">
        <div>
          {messages?.map((message, idx) => (
            <ChatOpenMessage
              chat={message?.text}
              sent={message?.senderId !== user?.uid}
              img={message?.img}
              key={idx}
            />
          ))}
        </div>
        {/**the send message box */}
        <Input />
      </div>
    </div>
  );
}

export default ChatOpen;
