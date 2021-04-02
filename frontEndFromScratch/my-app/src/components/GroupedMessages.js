import React, { Component } from 'react'
import MessageList from './MessageList';
import Button from 'react-bootstrap/Button';
import SendMessageForm from './SendMessageForm';


export class GroupedMessages extends Component {

  constructor(props) {
    super(props);

    this.state = {
        userSelected: ''
    }
}


  render() {

    const learners = this.props.chatMessages.reduce((learners, item) => {

      const learner = item.to === this.props.educatorId ? item.from : item.to;

      const messages = (learners[learner] || []);
      messages.push(item);
      learners[learner] = messages;
      return learners;
    }, {});

    const messageGroups = Object.entries(learners).map(entry => {
      var [id, messages] = entry;
      // TODO - need to calculate the time, then include on line 22 
      return { id, messages };
    });


    if (this.state.userSelected === ''){
        return (
          <>
          {
            //TODO  - sort before mapping (by time) hh-mm.... sorts naturally anyway.
            messageGroups.map(messageGroup => {

              return (
                <Button onClick={() => this.setState({ userSelected: messageGroup.id})} key = {messageGroup.id}>
                  {messageGroup.id}
                </Button>
              )
            })
          }
          </>
        )
    } else {
       return (
         messageGroups.map((item) => {
           if (item.id === this.state.userSelected){
            return (
            <>
              <Button onClick={() => this.setState({userSelected: ''})}>Back</Button>
              <MessageList chatMessages={item.messages} key={item.id} />
              <SendMessageForm 
                  sendChatMessage = {this.props.sendEducatorsChatMessage} 
                  learnerId = {this.state.userSelected} 
                  userId = {this.props.educatorId}  
                  educatorId = {this.props.educatorId}
              />
            </>
            )
          } 
         })
       )
    }
  }
}



export default GroupedMessages
