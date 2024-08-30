import { createContext, useState } from "react";

export const ChatContext = createContext({
  chatOpen: false,
  setChatOpen: () => {},
  chatId: "null",
  foundUser: {},
  setFoundUser: () => {},
  userData: {},
  setUserData: () => {},
});

export const ChatContextProvider = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatId, setChatId] = useState("null");
  const [foundUser, setFoundUser] = useState({});
  const [userData, setUserData] = useState({});
  const value = {
    chatOpen,
    setChatOpen,
    chatId,
    setChatId,
    foundUser,
    setFoundUser,
    userData,
    setUserData,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
