import React, { Component } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList as ChatScopeMessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';
    


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
                      }}><Avatar src= {("/images/" + message.from + ".ico" )} name= {message.from} /></Message>)                
                  } else {
                    return(
                      <Message model={{
                        message: message.text,
                        //sentTime: "just now",
                        sender: message.from,
                        direction: "incoming"
                      }}><Avatar src= {("/images/" + message.from + ".ico" )} name= {message.from} /></Message>)
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



