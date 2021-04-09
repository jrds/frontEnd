import React, { Component } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import LessonPlan from './LessonPlan';
import GroupedMessages from './GroupedMessages';
import StartNextLesson from './StartNextLesson';
import LearnerGrid from './LearnerGrid';
import OpenHelpRequests from './OpenHelpRequests';
import ZoomInOnLearner from './ZoomInOnLearner';

class EducatorPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userSelected: '',
    }

    this.selectUser = this.selectUser.bind(this);
    this.deSelectUser = this.deSelectUser.bind(this);

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

      return (
        <Container fluid>
          <Row>
              <Col sm={9} className = "main-display-area-educator">
                {display}
              </Col>
            <Col sm={3}>
              <GroupedMessages chatMessages = {this.props.chatMessages} educatorId={this.props.educatorId} sendEducatorsChatMessage = {this.props.sendEducatorsChatMessage} userId = {this.props.userId}/>
              <OpenHelpRequests openHelpRequests = {this.props.openHelpRequests} sendUpdateHelpRequest = {this.props.sendUpdateHelpRequest} sendEducatorCancelsHelpRequest = {this.props.sendEducatorCancelsHelpRequest}/>
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

}

export default EducatorPage;

