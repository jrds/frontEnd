import React, { Component } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import LessonPlan from './LessonPlan';
import MessageList from './MessageList';
import StartNextLesson from './StartNextLesson';
import LearnerGrid from './LearnerGrid';
import OpenHelpRequests from './OpenHelpRequests';

class EducatorPage extends Component {



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
      return (
        <Container>
          <Row>
            <Col>
              {/* THE activeLearners is empty. dummy info in learnerGrid line is just a test to show if the cards are wokring //TODO */}
              {/*console.log(this.props.activeLearners.size)} 
              {console.log(this.props.activeLearners)*/}
              {/*<LearnerGrid activeLearners = {this.props.activeLearners}/>*/}
              <LearnerGrid dummyLearners = {this.props.dummyLearners}/>
            </Col>
            <Col>
              <MessageList chatMessages = {this.props.chatMessages}/>
              <div> Will show help requests too!!</div>
              <OpenHelpRequests openHelpRequests = {this.props.openHelpRequests} sendUpdateHelpRequest = {this.props.sendUpdateHelpRequest} sendEducatorCancelsHelpRequest = {this.props.sendEducatorCancelsHelpRequest}/>
            </Col>
          </Row>
        </Container>

      )
    }
  }
}

export default EducatorPage;

