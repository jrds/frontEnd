import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';  
import Editor from "../components/Editor";
import Instruction from "./Instruction";
import ChatToggleAndHeader from "../components/ChatToggleAndHeader";
import MessageList from "../components/MessageList";
import CodeConsole from "./CodeConsole";
import Button from 'react-bootstrap/Button';
import HandRaise from '../components/HandRaise';

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
                <div className="top-pane">
                <Editor 
                  language = "text/x-java" 
                  displayName = "Java"
                  value={props.code} 
                  onChange={props.setCode}
                />
                </div>
              </Row>
              <Row className = "code-button-row">
                  <Button className = "run-code-button" variant="outline-success" onClick = {handleClick}><i class="fas fa-play"></i>
                      Run Code
                  </Button>
        {/* TODO show last event time */}
                  <Button className = "stop-code-button" variant="outline-danger" onClick = {handleClick2}><i class="fas fa-stop"></i>
                      Stop Code Execution
                  </Button>
              </Row>
              <Row>
                <CodeConsole consoleStrings={props.consoleStrings} sendExecutionInput={props.sendExecutionInput} />
              </Row>
            </Col>
            <Col>
            <div className="message-pane">
                <ChatToggleAndHeader/>
                <MessageList handleSend = {value => props.sendLearnersChatMessage(value)} educatorId = {props.educatorId} chatMessages = {props.chatMessages} userId = {props.userId} otherUserId = {props.educatorId} otherUserName = {props.educatorName} /> {// TODO - think about how to seperate out the learners own message from the educators - how it wil work with formating etc.
                }   // TODO  - could change educator to an obj with name and id, and pass that in.
              </div>
            <div className="help-pane">  
                <HandRaise openHelpRequest = {props.openHelpRequest} sendHelpRequest={props.sendHelpRequest} sendLearnerCancelsHelpRequest = {props.sendLearnerCancelsHelpRequest}/>
            </div>
            </Col>
          </Row>
      </Container>
      )

    }



function handleClick(){
  props.sendCodeToCompileMessage()
  console.log("Run Code Button Pressed");
}

function handleClick2(){
  props.sendTerminateExecutionRequest()
  console.log("Stop Code Execution Pressed");
}

}


export default LearnerPage;


