import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';  
import Editor from "../components/Editor";
import Instruction from "./Instruction";
import SendMessageForm from "../components/SendMessageForm";
import ChatToggleAndHeader from "../components/ChatToggleAndHeader";
import MessageList from "../components/MessageList";

function LearnerPage(props) {

    
    if (props.lessonState === "NOT_STARTED")
    {
      return (
        <Container>
          <Row>
            <Col>
            <Image src="/images/StudentLessonLoadingPic.jpg" fluid/>
            </Col>
            <Col>
              <h1>Welcome LEARNER, your lesson hasn't started yet</h1>
              <Spinner animation="border" role="status" variant="info">
                <span className="sr-only">Loading...</span>
            </Spinner>
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
              <h2>Lesson started</h2>
              { 
                props.instructions.map(function(inst,idx) { 
                  return (<Instruction key={idx} instruction={inst}/>)
                })
              }
            </Col>
            <Col>
              <Row>
                <div className="pane top-pane">
                <Editor 
                  language = "text/x-java" 
                  displayName = "Java"
                  value={props.code} 
                  onChange={props.setCode}
                />
                </div>
              </Row>
              <Row>
                  <button onClick = {handleClick}>
                  Run Code
                  </button>
              </Row>
              <Row>
                <div className = "code-output">
                  
                </div>
              </Row>
            </Col>
            <Col>
            <div className="message pane">
                <ChatToggleAndHeader/>
                <MessageList chatMessages = {props.chatMessages}/>
                <SendMessageForm ws = {props.ws} educatorId={props.educatorId} userId = {props.userId} chatMessages = {props.chatMessages}/>
              </div>
            </Col>
          </Row>
      </Container>
      )

    }
}


function handleClick(){
  /* this.props.ws.send(JSON.stringify({
      id:1, 
      from:this.props.userId, 
      _type:"LessonStartMessage"}
  )) */
  console.log("Run Codeutton Pressed");
}




export default LearnerPage;


