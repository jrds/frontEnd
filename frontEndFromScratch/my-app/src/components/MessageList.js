import React, { Component } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ConversationHeader, VoiceCallButton, VideoCallButton, InfoButton, ChatContainer, MessageList as ChatScopeMessageList, Message, MessageInput, Avatar, Button, Loader } from '@chatscope/chat-ui-kit-react';
    


export class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      voiceState: "none",
      videoState: "none"
    }
  }
    
  render() {
    var avComponent = <div/>
    if (this.state.voiceState == "initiate")
    {
      avComponent = <div><Loader>Starting voice call</Loader><Button border onClick={() => this.setState({voiceState:"none"})}>Cancel</Button></div>
    }
    else if (this.state.videoState == "initiate")
    {
      avComponent = <div><Loader>Starting video call</Loader><Button border onClick={() => this.setState({videoState:"none"})}>Cancel</Button></div>
    }

    return (
    <>
      <div style={{ position:"relative", height: "500px" }}>
          <ChatContainer>       

          <ConversationHeader>
                <Avatar src={`/images/${this.props.otherUserId}.ico`} name={this.props.otherUserName} />
                <ConversationHeader.Content userName={this.props.otherUserName} info="Active 10 mins ago" />                                   
                <ConversationHeader.Actions>                                                                             
                  <VoiceCallButton title="Start voice call" disabled={this.state.voiceState !== "none" || this.state.videoState !== "none"} onClick={() => this.initiateVoiceCall()} />
                  <VideoCallButton title="Start video call" disabled={this.state.voiceState !== "none" || this.state.videoState !== "none"} onClick={() => this.initiateVideoCall()}/>
                  <InfoButton title="Eventually shows active help request?"/>
                </ConversationHeader.Actions>
            </ConversationHeader>


            <ChatScopeMessageList>
            <ChatScopeMessageList.Content>
            {avComponent}

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
              </ChatScopeMessageList.Content>
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

  initiateVoiceCall() {
    this.setState({voiceState:"initiate"});
    const stream = window.navigator.mediaDevices.getUserMedia(
      {
        audio: true,
      },
    );
  }

  initiateVideoCall() {
    this.setState({videoState:"initiate"});
    const stream = window.navigator.mediaDevices.getUserMedia(
      {
        video: true,
        audio: true,
      },
    );
  }}

export default MessageList



