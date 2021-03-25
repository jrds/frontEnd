import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LessonPlan from './LessonPlan';
import MessageList from './MessageList';
import StartNextLesson from './StartNextLesson';

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
              <h1>A STARTED LESSON</h1>
            </Col>
            <Col>
              <MessageList chatMessages = {this.props.chatMessages}/>
            </Col>
          </Row>
        </Container>

      )
    }
  }
}

export default EducatorPage;

