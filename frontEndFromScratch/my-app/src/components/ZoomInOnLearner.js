import React, { Component } from 'react';
import ZoomInCodeEditor from './ZoomInCodeEditor';
import Button from 'react-bootstrap/Button';
import MessageList from './MessageList';


export class ZoomInOnLearner extends Component {
    
    

    render() {
    
        console.log("ZoomInOnLearner type is" + (typeof this.props.sendCodeToCompileMessage))


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
                <ZoomInCodeEditor 
                    learnerObj = {this.props.learnerObj} 
                    myCode = {this.props.code} 
                    setEduCode = {this.props.setEduCode}
                    consoleStrings={this.props.consoleStrings} 
                    sendExecutionInput={this.props.sendExecutionInput}
                    sendCodeToCompileMessage = {() => this.props.sendEduCodeToCompileMessage(this.props.userSelected)}
                    sendTerminateExecutionRequest = {this.props.sendTerminateExecutionRequest}
                    updateEduCodeToCode = {this.props.updateEduCodeToCode}

                    />    
                <div className="message-pane" style = {{border: "2px solid #c6e3fa", borderRadius: "30px", marginTop: "20px", padding: "10px", height : "250px"}}>
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
            </div>
        )
    }
}

export default ZoomInOnLearner
