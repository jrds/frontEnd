import React, { Component } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList as ChatScopeMessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
    


export class MessageList extends Component {

    
  render() {
    return (
    <>
      
      <div style={{ position:"relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>       
            <ChatScopeMessageList>
              {this.props.chatMessages.map(message => {
                  if(message.from === this.props.userId){
                    return (
                      <Message model={{
                        message: message.text,
                        //sentTime: "just now",
                        sender: this.props.userId,
                        direction: "outgoing",
                      }} />)                
                  } else {
                    return(
                      <Message model={{
                        message: message.text,
                        //sentTime: "just now",
                        sender: message.from,
                        direction: "incoming"
                      }} />)
                  }
                
                })
              }
            </ChatScopeMessageList>
            <MessageInput 
              attachButton={false} 
              placeholder="Type message here" 
              onSend={this.props.handleSend}/>        
          </ChatContainer>
        </MainContainer>
      </div>
    </>  
    )
  }
}


export default MessageList







    //   <ul className="message-list">                 
    //     {this.props.chatMessages.map(message => {

    //       if (message.from === this.props.userId) {
    //         return (
    //           <li className = "message-from-me" key={message.from + message.id}>
    //             <div>
    //               Me:
    //             </div>
    //             <div>
    //               {message.text}
    //             </div>
    //           </li>
    //         )
    //       } else {
    //         return (
    //           <div className = "message-from-other" key={message.from + message.id} style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
    //             <div>
    //               {message.from + ":"}
    //             </div>
    //             <div>
    //               {message.text}
    //             </div>
    //           </div>
    //         )
    //       }
          

          
    //    })}
    //  </ul>