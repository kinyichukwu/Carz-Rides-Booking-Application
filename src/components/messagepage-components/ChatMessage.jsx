import { CHATS } from "../../testdata/textchatdata";
import { Link, useParams } from "react-router-dom";
import { getLastChatTime } from "../../helpers/chatTime";
import person2 from "../../assets/message/message-icon2.png";


function ChatMessage() {
  return <></>
  
  // return (
  //   <>
  //     {CHATS?.map((person, idx) => {
  //       const { name, driver } = person;

  //       console.log(person.lastMessage()?.message);
  //       return (
  //         <>
  //           <Link to={`chats/${CHATS[idx].id}`}>
  //             <div className="chat--i ">
  //               <div className="image">
  //                 <img src={person2} alt="fff" />
  //               </div>

  //               <div
  //                 className={`message ${
  //                   person.lastMessage().read ? " " : " unread"
  //                 }`}
  //               >
  //                 <h2>
  //                   {name}
  //                   {driver && <span> (Driver)</span>}
  //                 </h2>
  //                 {/**If I sent a message to to someone */}
  //                 <p>
  //                   {person.lastMessage().sent && <span>Me: {"  "}</span>}
  //                   {person.lastMessage().message}
  //                 </p>
  //               </div>
  //               <div className="span">
  //                 {person.numberOfUnreadMessages() > 0 && (
  //                   <p className="num">{person.numberOfUnreadMessages()} </p>
  //                 )}

  //                 <p className="time">
  //                   {getLastChatTime(person.lastMessage().time)}
  //                 </p>
  //               </div>
  //             </div>
  //           </Link>
  //           <hr />
  //         </>
  //       );
  //     })}
  //   </>
  // );
}

export default ChatMessage;
