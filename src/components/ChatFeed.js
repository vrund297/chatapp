import { LogoutOutlined } from "@ant-design/icons";
import React from "react";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
  //console.log(props);

  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];
  const handleLogout =(e) => {
    e.preventDefault();

    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload();
  } 

  const renderReadReciepts = (message, isMyMessage) => {
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
              border: "1px solid black",
            }}
          >
            {console.log(person?.person?.avatar)}
          </div>
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;
      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}

            {message.text === "bye"
              ? console.log("bye")
              : console.log(message.text)}
            {/* {console.log(
              isMyMessage,
              userName,
              message.sender.username,
              message,
              i=i+1,
            )} */}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReciepts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };
  if (!chat) return <div>Loading ... </div>;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
      <LogoutOutlined  onClick={handleLogout}/>
      
        <div className="chat-title">{chat.title}</div>
        <div className="chat-subtitle">
          <h4>group members</h4>
          {chat.people.map((person) => 
          <div> 
          {person.person.username} 
          </div>
          )}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: "100px" }}></div>
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
