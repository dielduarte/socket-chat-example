import React from 'react';
import './MessagesList.css';

const MessagesList = ({ messages }) => <div>
  {
    messages.map((message, id) => {
      return (
        <div className="messages-container" key={id}>
          <h4 className="messages-userName"> 
            <span style={{color: `rgb${message.userColor}`}}>{message.userName}</span> says:
          </h4> 
          <p> {message.message}</p>
        </div>
      );
   })
  }
</div>

export default MessagesList;