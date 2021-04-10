import React, { Component } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ConversationHeader, VoiceCallButton, VideoCallButton, InfoButton, ChatContainer, MessageList as ChatScopeMessageList, Message, MessageInput, Avatar, Button, Loader } from '@chatscope/chat-ui-kit-react';
import Alert from 'react-bootstrap/Alert';


export class MessageList extends Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef()
    this.audioRef = React.createRef()

    this.state = {
      voiceState: "none",
      videoState: "none"
    }
  }

  render() {
    var avComponent = <div />;
    var actions;

    if (this.state.voiceState === "none" && this.state.videoState === "none")
    {
      actions = <ConversationHeader.Actions>
                  <VoiceCallButton title="Start voice call" disabled={this.state.voiceState !== "none" || this.state.videoState !== "none"} onClick={() => this.initiateVoiceCall()} />
                  <VideoCallButton title="Start video call" disabled={this.state.voiceState !== "none" || this.state.videoState !== "none"} onClick={() => this.initiateVideoCall()} />
                  <InfoButton title="Eventually shows active help request?" />
                </ConversationHeader.Actions>
    }
    if (this.state.voiceState === "initiate") {
      avComponent = <div><Loader>Starting voice call</Loader><Button border onClick={() => this.setState({ voiceState: "none" })}>Cancel</Button></div>
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.setState({ voiceState: "none" })}>Cancel</Button>
                </ConversationHeader.Actions>
    }
    else if (this.state.voiceState === "failed") {
      avComponent = <div><Alert variant="danger"><p>Voice call failed</p></Alert></div>
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.setState({ voiceState: "none" })}>Close</Button>
                </ConversationHeader.Actions>
    }
    else if (this.state.voiceState === "streaming") {
      avComponent = <audio ref={this.audioRef} controls volume="true" autoPlay />
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.setState({ voiceState: "none" })}>Hang up</Button>
                </ConversationHeader.Actions>
    }

    else if (this.state.videoState === "initiate") {
      avComponent = <div><Loader>Starting video call</Loader><Button border onClick={() => this.setState({ videoState: "none" })}>Cancel</Button></div>
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.setState({ videoState: "none" })}>Cancel</Button>
                </ConversationHeader.Actions>
    }
    else if (this.state.videoState === "failed") {
      avComponent = <div><Alert variant="danger" onClose={() => this.setState({ videoState: "none" })} dismissible><p>Video call failed</p></Alert></div>
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.setState({ videoState: "none" })}>Close</Button>
                </ConversationHeader.Actions>
    }
    else if (this.state.videoState === "streaming") {
      avComponent = <video ref={this.videoRef} controls volume="true" autoPlay />
      actions = <ConversationHeader.Actions>
                  <Button border onClick={() => this.setState({ videoState: "none" })}>Hang up</Button>
                </ConversationHeader.Actions>
    }

    return (
      <>
        <div style={{ position: "relative", height: "500px" }}>
          <ChatContainer>

            <ConversationHeader>
              <Avatar src={`/images/${this.props.otherUserId}.ico`} name={this.props.otherUserName} />
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
                      }}><Avatar src={("/images/" + message.from + ".ico")} name={message.from} /></Message>)
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
    if (this.state.stream && this.state.voiceState === "none" && this.state.videoState === "none")
    {
      const tracks = this.state.stream.getTracks();

      tracks.forEach(function(track) {
        track.stop();
      });
    }

    if (this.videoRef.current !== null && this.videoRef.current.srcObject !== this.state.stream) {
      this.videoRef.current.srcObject = this.state.stream
    }
    else if (this.audioRef.current !== null && this.audioRef.current.srcObject !== this.state.stream) {
      this.audioRef.current.srcObject = this.state.stream
    }
  }

  initiateVoiceCall() {
    this.setState({ voiceState: "initiate" });
    window.navigator.mediaDevices.getUserMedia(
      {
        audio: true,
      },
    ).then(stream => {
      this.setState({
        voiceState: "streaming",
        stream: stream
      });
    }).catch(reason => {
      console.log("voice failed: " + reason);
      this.setState({
        voiceState: "failed"
      });
    });
  }

  initiateVideoCall() {
    this.setState({ videoState: "initiate" });
    window.navigator.mediaDevices.getUserMedia(
      {
        video: true,
        audio: true,
      },
    ).then(stream => {
      this.setState({
        videoState: "streaming",
        stream: stream
      });
    }).catch(reason => {
      console.log("video failed: " + reason);
      this.setState({
        videoState: "failed"
      });
    });
  }
}

export default MessageList



