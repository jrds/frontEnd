import React, { Component } from 'react';
import AboveThumbnailable from './AboveThumbnailable';
import Thumbnailable from './Thumbnailable';
import ZoomInCodeConsole from './ZoomInCodeConsole';
import Button from 'react-bootstrap/Button';
import MessageList from './MessageList';


export class ZoomInOnLearner extends Component {
    
    render() {
    
    // TODO @ Educator level? (repeated code)
    const learners = this.props.chatMessages.reduce((learners, item) => {

        const learner = item.to === this.props.userId ? item.from : item.to;
  
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
      messageGroups.filter(item => item.id === this.props.userSelected).forEach(item => messages = item.messages);
  
  

    
        return (
            <div>
                <Button size="sm" variant="outline-info" onClick = {this.props.deSelectUser}>Back</Button>
                <AboveThumbnailable learnerObj = {this.props.learnerObj}/>
                <Thumbnailable learnerObj = {this.props.learnerObj}/>    
                <ZoomInCodeConsole
 
                    learnerObj = {this.props.learnerObj}  
                /> 
                <div className="message-pane" style = {{border: "2px solid #c6e3fa", borderRadius: "30px", marginTop: "20px", padding: "10px"}}>
                    <MessageList handleSend = {value => this.props.sendEducatorsChatMessage(value, this.props.userSelected)} 
                             userId = {this.props.userId} 
                             chatMessages = {messages} 
                             otherUserId = {this.props.learnerObj.id} 
                             otherUserName = {this.props.learnerObj.name}
                             avState = {this.props.avState}            
                             acceptCall = {this.props.acceptCall}
                             rejectCall = {this.props.rejectCall}
                             startCall = {type => this.props.educatorStartCall(type, this.props.userSelected)}
                             cancelCall = {this.props.cancelCall}
                             endCall = {this.props.endCall}
                             /> 
                </div>
                 {/* could end up being left and right //TODO
                    think about instructor to see execution of learners code. would mean having the console strings from the latest execution on the learner obj*/}
                </div>
        )
    }
}

export default ZoomInOnLearner
