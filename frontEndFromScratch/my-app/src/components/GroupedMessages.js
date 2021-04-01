import React, { Component } from 'react'
import MessageList from './MessageList';


export class GroupedMessages extends Component {

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

    return (
      <>
      {
        //TODO  - sort before mapping (by time) hh-mm.... sorts naturally anyway.
        messageGroups.map(messageGroup => {

          return (
            <MessageList chatMessages={messageGroup.messages} key={messageGroup.id} />
          )
        })
      }
      </>
    )
  }
}



export default GroupedMessages
