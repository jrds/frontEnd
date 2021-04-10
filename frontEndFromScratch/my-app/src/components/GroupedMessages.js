import React, { Component } from 'react'
import MessageList from './MessageList';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { MainContainer, ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react';


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

    var messages = [];
    messageGroups.filter(item => item.id === this.state.userSelected).forEach(item => messages = item.messages);

        return (

          <MainContainer>

            <div style={{height: "340px"}}>
              <ConversationList>
                  {this.props.learners.filter(l => l.attending).map(l => {
                    var lastMessage = {from:"", text:""};
                    var group = messageGroups.find(g => g.id === l.id);
                    if (group)
                    {
                      lastMessage = group.messages[group.messages.length - 1];
                    }

                    return (
                      <Conversation onClick={() => this.setState({userSelected: l.id})} name={l.name} active={l.id === this.state.userSelected} lastSenderName={lastMessage.from == this.props.userId ? "me" : "them"} info={lastMessage.text}>
                        <Avatar src= {`/images/${l.id}.ico`} name = {l.name} />
                      </Conversation>
                    )
                  })

                  }
                  
              </ConversationList>
            </div>
            <div>
              <MessageList handleSend={value => this.props.sendEducatorsChatMessage(value, this.state.userSelected)} chatMessages={messages} userId = {this.props.educatorId}/>
            </div>

            </MainContainer>

        )
  }
}



export default GroupedMessages




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