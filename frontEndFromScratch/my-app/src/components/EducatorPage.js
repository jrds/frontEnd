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
        //{/* THE activeLearners is empty. dummy info in learnerGrid line is just a test to show if the cards are wokring //TODO */}
        //{/*console.log(this.props.activeLearners.size)} 
        //{console.log(this.props.activeLearners)*/}
        //{/*<LearnerGrid activeLearners = {this.props.activeLearners}/>*/}
          display = <LearnerGrid dummyLearners = {this.props.dummyLearners}/>
      } else {
          display = <ZoomInOnLearner userSelected = {this.state.userSelected}/>
      }

      return (
        <Container>
          <Row>
              <Col>
                {display}
              </Col>
            <Col>
              <GroupedMessages chatMessages = {this.props.chatMessages} educatorId={this.props.educatorId} sendEducatorsChatMessage = {this.props.sendEducatorsChatMessage} userId = {this.props.userId}/>
              <OpenHelpRequests openHelpRequests = {this.props.openHelpRequests} sendUpdateHelpRequest = {this.props.sendUpdateHelpRequest} sendEducatorCancelsHelpRequest = {this.props.sendEducatorCancelsHelpRequest}/>
            </Col>
          </Row>
        </Container>

      )
    }
  }
}

export default EducatorPage;

