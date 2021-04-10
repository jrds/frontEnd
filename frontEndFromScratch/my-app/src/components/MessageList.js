import React, { Component } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ConversationHeader, VoiceCallButton, VideoCallButton, InfoButton, ChatContainer, MessageList as ChatScopeMessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';
    


export class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      voiceState: "none",
      videoState: "none"
    }
  }
    
  render() {
    return (
    <>
      <div style={{ position:"relative", height: "500px" }}>
          <ChatContainer>       

          <ConversationHeader>
                <Avatar src={`/images/${this.props.otherUserId}.ico`} name={this.props.otherUserName} />
                <ConversationHeader.Content userName={this.props.otherUserName} info="Active 10 mins ago" />                                   
                <ConversationHeader.Actions>                                                                             
                  <VoiceCallButton title="Start voice call" onClick={() => this.setState({voiceState:"initiate"})} />
                  <VideoCallButton title="Start video call" onClick={() => this.setState({videoState:"initiate"})}/>
                  <InfoButton title="Eventually shows active help request?"/>
                </ConversationHeader.Actions>
            </ConversationHeader>

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
      </div>
    </>  
    )
  }
}


export default MessageList



