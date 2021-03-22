import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LessonPlan from './LessonPlan';
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
      return <h1>A STARTED LESSON</h1>
    }
  }
}

export default EducatorPage;

