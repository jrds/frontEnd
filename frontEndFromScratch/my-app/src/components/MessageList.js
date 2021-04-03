import React, { Component } from 'react'

export class MessageList extends Component {
    
  render() {
    return (
      <ul className="message-list">                 
        {this.props.chatMessages.map(message => {

          if (message.from === this.props.userId) {
            return (
              <li className = "message-from-me" key={message.from + message.id}>
                <div>
                  Me:
                </div>
                <div>
                  {message.text}
                </div>
              </li>
            )
          } else {
            return (
              <div className = "message-from-other" key={message.from + message.id} style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
                <div>
                  {message.from + ":"}
                </div>
                <div>
                  {message.text}
                </div>
              </div>
            )
          }
          

          
       })}
     </ul>
    )
  }
}


export default MessageList
