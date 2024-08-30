import {
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import I1 from "../../assets/message/messageIcon1.png";
import I2 from "../../assets/message/messageIcon2.svg";
import { ChatContext } from "../../contexts/ChatContext";
import { useUser } from "../../contexts/UserContext";
import { database, storage } from "../../firebaseConfig";



const Input = () => {
  const [text, setText] = useState("");

  const { user } = useUser();
  const { foundUser, chatId } = useContext(ChatContext);

  const handelSendImage = async (e) => {
    const image = e.target.files[0];
    if (!image) {
      toast.error("Please choose a file");
    } else if (image.size / 1024 / 1024 > 8.1) {
      toast.error("Image size too large!");
    } else {
      const storageRef = ref(storage, `/${chatId}/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if (percent === 100) {
            toast.success("Image Sent");
          }
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            await updateDoc(doc(database, "chats", chatId), {
              messages: arrayUnion({
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                img: url,
              }),
            });
          });
        }
      );
    }
  };
  

  const handleSend = async () => {
    const docRef = doc(database, "userChats", foundUser.uid);
    const docSnap = await getDoc(docRef);

    if (
      Object.entries(docSnap.data())[0][1] &&
      Object.entries(docSnap.data())[0][1]?.lastMessage &&
      Object.entries(docSnap.data())[0][1]?.lastMessage?.unRead === undefined
    ) {
      await updateDoc(doc(database, "userChats", foundUser.uid), {
        [chatId + ".lastMessage"]: {
          text,
          unRead: 1,
        },
        [chatId + ".date"]: serverTimestamp(),
      });
    } else {
      let unRead = Object.entries(docSnap.data())[0][1]?.lastMessage?.unRead + 1
        

      await updateDoc(doc(database, "userChats", foundUser.uid), {
        [chatId + ".lastMessage"]: {
          text,
          unRead,
        },
        [chatId + ".date"]: serverTimestamp(),
      });
    }

    await updateDoc(doc(database, "userChats", user.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(database, "chats", chatId), {
      messages: arrayUnion({
        text,
        senderId: user.uid,
        date: Timestamp.now(),
      }),
    });

    setText("");
  };

  return (
    <div className="sendMB">
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        accept="image/*"
        onChange={handelSendImage}
      />

      <label htmlFor="file" className="otherButton">
        <img src={I1} alt="" />
      </label>
      <input
        placeholder="Type your message here..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <img src={I2} alt="" className="sendButton" onClick={handleSend} />
    </div>
  );
};

export default Input;
