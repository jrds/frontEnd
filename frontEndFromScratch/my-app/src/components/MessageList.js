import React, { Component } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ConversationHeader, VoiceCallButton, VideoCallButton, InfoButton, ChatContainer, MessageList as ChatScopeMessageList, Message, MessageInput, Avatar, Button, Loader } from '@chatscope/chat-ui-kit-react';
import Alert from 'react-bootstrap/Alert';


export class MessageList extends Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef()
    this.audioRef = React.createRef()
  }

  render() {
    var avComponent = <div />;
    var actions = <ConversationHeader.Actions/>;

    if (this.props.avState.state === "none")
    {
      if (this.props.startCall)
      {
        actions = <ConversationHeader.Actions>
                  <VoiceCallButton title="Start voice call" onClick={() => this.props.startCall("audio")} />
                  <VideoCallButton title="Start video call" onClick={() => this.props.startCall("video")} />
                  <InfoButton title="Eventually shows active help request?" />
                </ConversationHeader.Actions>
      }
    }
    else if (this.props.avState.state === "initiating") {
      avComponent = <div><Loader>Starting call</Loader></div>
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.props.cancelCall()}>Cancel</Button>
                </ConversationHeader.Actions>
    }
    else if (this.props.avState.state === "failed") {
      avComponent = <div><Alert variant="danger"><p>{this.props.avState.reason ? this.props.avState.reason : "Call failed"}</p></Alert></div>
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.props.cancelCall()}>Close</Button>
                </ConversationHeader.Actions>
    }
    else if (this.props.avState.state === "offering") {
      avComponent = <div><Loader>Calling ...</Loader></div>
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.props.cancelCall()}>Cancel</Button>
                </ConversationHeader.Actions>
    }
    else if (this.props.avState.state === "offerReceived") {
      avComponent = <div>{this.props.otherUserName + " is calling (" + this.props.avState.type + " call)"}</div>
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.props.acceptCall()}>Accept</Button>
                  <Button border onClick={() => this.props.rejectCall()}>Reject</Button>
                </ConversationHeader.Actions>
    }
    // else if (this.state.voiceState === "streaming") {
    //   avComponent = <audio ref={this.audioRef} controls volume="true" autoPlay />
    //   actions = <ConversationHeader.Actions>
    //               <Button border onClick={() => this.setState({ voiceState: "none" })}>Hang up</Button>
    //             </ConversationHeader.Actions>
    // }
    else if (this.props.avState.state === "streaming") {
      avComponent = <video ref={this.videoRef} style={{ height: "150px", width: "100%", position: "relative"}} controls volume="true" autoPlay />
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.setState({ videoState: "none" })}>Hang up</Button>
                </ConversationHeader.Actions>
    }

    return (
      <>
        <div style={{ height: (this.props.userId.startsWith("e")) ? "100%" : "600px" , width: "100%" }}>
          <ChatContainer>

            <ConversationHeader>
              <Avatar src={`/images/${this.props.otherUserId}.ico`} name={this.props.otherUserName}  size="md"/>
              <ConversationHeader.Content userName={this.props.otherUserName} info="Active 10 mins ago" />
              {actions}
            </ConversationHeader>


            <ChatScopeMessageList>
              <ChatScopeMessageList.Content>
                {avComponent}

                {this.props.chatMessages.map(message => {
                  if (message.from === this.props.userId) {
                    return (
                      <Message model={{
                        message: message.text,
                        //sentTime: "just now",
                        sender: this.props.userId,
                        direction: "outgoing",
                      }}><Avatar src={("/images/" + message.from + ".ico")} name={message.from}  size="md"/></Message>)
                  } else {
                    return (
                      <Message model={{
                        message: message.text,
                        //sentTime: "just now",
                        sender: message.from,
                        direction: "incoming"
                      }}><Avatar src={("/images/" + message.from + ".ico")} name={message.from} /></Message>)
                  }

                })
                }
              </ChatScopeMessageList.Content>
            </ChatScopeMessageList>
            <MessageInput
              attachButton={false}
              placeholder="Type message here"
              onSend={this.props.handleSend} />
          </ChatContainer>
        </div>
      </>
    )
  }

  componentDidMount() {
    this.updateStream()    
  }
  
  componentDidUpdate() {
    this.updateStream()
  }

  updateStream() {
    if (this.props.avState.stream)
    {
      if (this.props.avState.state === "none")
      {
        this.props.avState.stream.getTracks().forEach(function(track) {
          track.stop();
        });
      }

      if (this.videoRef.current !== null && this.videoRef.current.srcObject !== this.props.avState.stream) {
        this.videoRef.current.srcObject = this.props.avState.stream
      }
      else if (this.audioRef.current !== null && this.audioRef.current.srcObject !== this.props.avState.stream) {
        this.audioRef.current.srcObject = this.props.avState.stream
      }
    }
  }
}


export default MessageList



