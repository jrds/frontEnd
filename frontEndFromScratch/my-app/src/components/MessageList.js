import React, { Component } from 'react'

export class MessageList extends Component {
    
    render() {
          return (
            <ul className="message-list">                 
              {this.props.chatMessages.map(message => {
                return (
                 <li key={message.id}>
                   <div>
                     {message.senderId}
                   </div>
                   <div>
                     {message.text}
                   </div>
                 </li>
               )
             })}
           </ul>
          )
        }
}


export default MessageList