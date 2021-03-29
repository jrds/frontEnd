import React, { Component } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import LessonPlan from './LessonPlan';
import MessageList from './MessageList';
import StartNextLesson from './StartNextLesson';
import LearnerGrid from './LearnerGrid';

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
              {console.log(this.props.activeLearners.size)} 
              {console.log(this.props.activeLearners)}
              <LearnerGrid activeLearners = {this.props.activeLearners}/>
            </Col>
            <Col>
              <MessageList chatMessages = {this.props.chatMessages}/>
              <div> Will show help requests too!!</div>
            </Col>
          </Row>
        </Container>

      )
    }
  }
}

export default EducatorPage;

