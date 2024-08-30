export const getLastChatTime = (lastMessageTime) => {
  if (lastMessageTime?.toString() === "Invalid Date") return "";

  let messageTime = lastMessageTime;

  let isToday =
    Math.floor(lastMessageTime / (60 * 60 * 1000 * 24)) ===
    Math.floor(new Date() / (60 * 60 * 1000 * 24));

  if (isToday) {
    let hours = messageTime.getHours();
    let minutes = messageTime.getMinutes();
  

    let isLessThanHour = new Date() - messageTime < 60 * 60 * 1000;
    if (isLessThanHour) {
      if (new Date() - messageTime < 61 * 1000) {
        return " just now";
      }

      let time = Math.floor((new Date() - messageTime) / (1000 * 60));
      return time > 1 ? time + " mins ago" : time + " min ago";
    }

    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let timeString = hours + ":" + minutes + " " + ampm;
    lastMessageTime = timeString;
    return lastMessageTime;
  } else {
    return messageTime.toLocaleDateString();
  }
};

export const getLastChatTimeAsString = (lastMessageTime) => {
  if (lastMessageTime?.toString() === "Invalid Date") return "";

  let messageTime = lastMessageTime;
  

  let isToday =
    Math.floor(lastMessageTime / (60 * 60 * 1000 * 24)) ===
    Math.floor(new Date() / (60 * 60 * 1000 * 24));

  let isYesterday =
    Math.floor(lastMessageTime / (60 * 60 * 1000 * 24)) + 1 ===
    Math.floor(new Date() / (60 * 60 * 1000 * 24));

  let hours = messageTime?.getHours();
  let minutes = messageTime.getMinutes();


  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let timeString = hours + ":" + minutes + " " + ampm;
  lastMessageTime = timeString;
  if (isToday) {
    return "Last Seen Today, " + lastMessageTime;
  }
  if (isYesterday) {
    return "Last Seen Yesterday, " + lastMessageTime;
  }

  return "Last Seen "+ messageTime.toLocaleDateString();
};
