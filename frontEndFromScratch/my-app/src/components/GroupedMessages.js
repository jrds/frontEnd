import React, { Component } from 'react'
import MessageList from './MessageList';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react';


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

            <div style={{height: "340px"}}>
              <ConversationList>

                  <Conversation name="Jordan" lastSenderName="Me" info="Yes i can do it for you">
                    <Avatar src= "/images/u1900.ico" name = "Jordan" />
                  </Conversation>
        
                  <Conversation name="Aaron" lastSenderName="Aaron" info="Yes i can do it for you">
                    <Avatar src= "/images/u1902.ico" name = "Aaron" />
                  </Conversation>
                  
              </ConversationList>
            </div>

          // <ButtonGroup vertical>
          
          // {
          //   //TODO  - sort before mapping (by time) hh-mm.... sorts naturally anyway.
          //   messageGroups.map(messageGroup => {

          //     var learnerName = this.props.detailsByLearner.get(messageGroup.id).name ;

          //     return (  
          //      <> 
          //        <Button onClick={() => this.setState({ userSelected: messageGroup.id})} key = {messageGroup.id}>
          //           {learnerName}
          //         </Button>
          //      </>
          //     )
          //   })
          // }
          // </ButtonGroup>
        )
    } else {
       return (
         messageGroups.filter(item => item.id === this.state.userSelected).map((item) => {
          return (
            <div key = {item.id}>
              <Button onClick={() => this.setState({userSelected: ''})}>Back</Button>
              <MessageList handleSend={value => this.props.sendEducatorsChatMessage(value, this.state.userSelected)} chatMessages={item.messages} userId = {this.props.educatorId}/>
            </div>
            ) 
         })
       )
    }
  }
}



export default GroupedMessages
