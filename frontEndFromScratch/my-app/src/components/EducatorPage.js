import React, { Component } from 'react';
import {Container, Row, Col, ToggleButton } from 'react-bootstrap';
import LessonPlan from './LessonPlan';
import GroupedMessages from './GroupedMessages';
import StartNextLesson from './StartNextLesson';
import LearnerGrid from './LearnerGrid';
import OpenHelpRequests from './OpenHelpRequests';
import ZoomInOnLearner from './ZoomInOnLearner';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button'


class EducatorPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userSelected: '',
      showMessages: true,
      chatExpanded: false

    }

    this.selectUser = this.selectUser.bind(this);
    this.deSelectUser = this.deSelectUser.bind(this);
    this.updateUserToHelp = this.updateUserToHelp.bind(this);

}

  render() {
    if (this.props.lessonState === "NOT_STARTED")
    {
      return(
        <Container>
          <Row>
             <Col>
               <LessonPlan/>
             </Col>
             <Col>
               <StartNextLesson ws={this.props.ws} userId={this.props.userId}/>
             </Col>
           </Row>
        </Container>
      )
    }
    else
    { 
      var display; 

      if (this.state.userSelected === '') {
 
          display = <LearnerGrid 
            learners = {this.props.learners}
            detailsByLearner = {this.props.detailsByLearner}
            selectUser = {this.selectUser}
            />
        } else {
          display = <ZoomInOnLearner 
            userSelected = {this.state.userSelected}
            learnerObj = {this.props.detailsByLearner.get(this.state.userSelected)}
            deSelectUser = {this.deSelectUser}
          />
      }

      var sideDisplay;

      if (this.state.showMessages){
        sideDisplay = <GroupedMessages 
          learners = {this.props.learners}
          detailsByLearner = {this.props.detailsByLearner}
          chatMessages = {this.props.chatMessages} 
          educatorId={this.props.educatorId} 
          sendEducatorsChatMessage = {this.props.sendEducatorsChatMessage} 
          userId = {this.props.userId}
          avState = {this.props.avState}            
          educatorStartCall = {this.props.educatorStartCall}
          cancelCall = {this.props.cancelCall}
          endCall = {this.props.endCall}
        />
      } else {
        sideDisplay = <OpenHelpRequests 
          openHelpRequests = {this.props.openHelpRequests} 
          sendUpdateHelpRequest = {this.props.sendUpdateHelpRequest} 
          sendEducatorCancelsHelpRequest = {this.props.sendEducatorCancelsHelpRequest}
          updateUserToHelp = {this.updateUserToHelp}
        />
      }

      return (
        <Container fluid className = "educator-page-lesson-started"> 
          <Row>
            <Col sm= {this.state.chatExpanded ? 6 : 9} className = "main-display-area-educator">
              {display}
            </Col>
            <Col sm= {this.state.chatExpanded ? 6 : 3}>
              <Row className = "educator-page-chat-help-header-row">
                <Button className = "expand-chat-icon-button" onClick = {() => this.setState({chatExpanded: !this.state.chatExpanded})} variant = "light" size="sm"><i class={ this.state.chatExpanded ? "fas fa-compress-alt" : "fas fa-expand-alt"}></i></Button>
                <ToggleButtonGroup name = "right-side-pane-toggle" className = "educator-page-chat-help-toggle" default = "messageButton">
                  <ToggleButton 
                    onClick = {() => this.setState({showMessages: false})} 
                    name = "helpRequestButton"
                    variant = {this.state.showMessages ? "info" : "outline-info"} 
                    type = "radio"
                    >
                      Help Requests
                  </ToggleButton>
                  <ToggleButton 
                    onClick = {() => this.setState({showMessages: true})} 
                    name = "messageButton"
                    variant = {this.state.showMessages ? "outline-info" : "info"} 
                    type = "radio"
                    >
                      Messages
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>
              <Row>
                {sideDisplay}
              </Row>
            </Col>
          </Row>
        </Container>

      )
    }
  }

  selectUser(userId){
    this.setState ({
      userSelected: userId
    })
  }

  deSelectUser(){
    this.setState ({
      userSelected: ''
    })
  }

  updateUserToHelp(userId){
    this.selectUser(userId);
  }

}

export default EducatorPage;

