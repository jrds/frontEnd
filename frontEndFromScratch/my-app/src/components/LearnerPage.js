import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Image, { propTypes } from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';  
import Editor from "../components/Editor";
import Instruction from "./Instruction";
import ChatToggleAndHeader from "../components/ChatToggleAndHeader";
import MessageList from "../components/MessageList";
import CodeConsole from "./CodeConsole";
import Button from 'react-bootstrap/Button';
import HandRaise from '../components/HandRaise';


function LearnerPage(props) {
    
    var instructions;

    if(props.instructions.length >0){
      instructions = 
        <div style = {{color:"#425f75", width: "100%", border: "2px solid #425f75", borderRadius: "5px", padding: "15px"}}>
          <div>
            <h2>Instructions:</h2>
          </div>
          <div>  
            <div style = {{width: "100%", minHeight: "100px"}}>
              <Instruction instruction = {props.instructions[props.instructionDisplayed-1]}/>
            </div>
            <div style = {{marginTop: "10px"}}>
              <Button onClick = {handleClick3} size = "sm" style = {{backgroundColor: "#c6e3fa", color:"#425f75", border: "2px solid #425f75", borderRadius: "5px", float: "left"}}>
                <i class="fas fa-arrow-left" style = {{marginRight: "15px"}}></i>
                prev 
              </Button>
              <Button  onClick = {handleClick4} size = "sm" style = {{backgroundColor: "#c6e3fa", color:"#425f75", border: "2px solid #425f75", borderRadius: "5px", float: "right"}}>
                  next
                  <i class="fas fa-arrow-right" style = {{marginLeft: "15px"}}></i>
              </Button>
            </div>
          </div>
        </div>

    } else {
      instructions = <div>Instructions loading</div>
    }


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
      
      console.log(props.instructions)
      console.log(props.instructionDisplayed)
      console.log(props.instructions[props.instructionDisplayed-1])

      return (
        <Container>
          <Row className = "instructions-row">
              {instructions}
          </Row>
          
          <Row>
              <Col>
                <Row>
                <div className="top-pane" style = {{minWidth: "800px", minheight: "600px", padding: "10px"}} >
                <Editor 
                  language = "text/x-java" 
                  displayName = "Java"
                  value={props.code} 
                  onChange={props.setCode}
                />
                </div>
              </Row>
              <Row className = "code-button-row">
                  <Button className = "run-code-button" variant="outline-success" onClick = {handleClick}><i class="fas fa-play" style = {{marginRight: "15px"}}></i>
                      Run Code
                  </Button>
        {/* TODO show last event time */}
                  <Button className = "stop-code-button" variant="outline-danger" onClick = {handleClick2}><i class="fas fa-stop" style = {{marginRight: "15px"}}></i>
                      Stop Code Execution
                  </Button>
              </Row>
              <Row>
                <div style = {{width: "100%", padding: "10px"}}>
                  <CodeConsole consoleStrings={props.consoleStrings} sendExecutionInput={props.sendExecutionInput} />
                </div>
              </Row>
            
            </Col>
            <Col>
            <div className="message-pane" style = {{paddingTop: "30px"}}>
                <MessageList handleSend = {value => props.sendLearnersChatMessage(value)} 
                             educatorId = {props.educatorId} 
                             chatMessages = {props.chatMessages} 
                             userId = {props.userId} 
                             otherUserId = {props.educatorId} 
                             otherUserName = {props.educatorName}
                             avState = {props.avState}            
                             acceptCall = {props.acceptCall}
                             rejectCall = {props.rejectCall}
                             /> 
                   {/* TODO  - could change educator to an obj with name and id, and pass that in.
                    * TODO - think about how to seperate out the learners own message from the educators - how it wil work with formating etc.
                    */}
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

function handleClick3(){
  props.prevInstruction()
  console.log("Previous Instruction Button Pressed");

}

function handleClick4(){
  props.nextInstruction()
  console.log("Next Instruction Button Pressed");

}

}


export default LearnerPage;


