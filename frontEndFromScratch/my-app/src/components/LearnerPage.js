import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';  
import Editor from "../components/Editor";
import Instruction from "./Instruction";
import MessageList from "../components/MessageList";
import CodeConsole from "./CodeConsole";
import Button from 'react-bootstrap/Button';
import HandRaise from '../components/HandRaise';


function LearnerPage(props) {
    
    var instructions;

    if(props.instructions.length >0){
      instructions = 
        <div style = {{color:"#425f75", background: "#d1e2f0",width: "100%", border: "2px solid #425f75", borderRadius: "30px", padding: "15px"}}>
          <div>
            <h2>Instructions:</h2>
          </div>
          <div>  
            <div style = {{width: "100%", minHeight: "100px"}}>
              <Instruction instruction = {props.instructions[props.instructionDisplayed-1]}/>
            </div>
            <div style = {{marginTop: "10px"}}>
              <Button onClick = {handleClick3} size = "sm" style = {{backgroundColor: "white", color:"#425f75", border: "2px solid #425f75", borderRadius: "5px", float: "left"}}>
                <i class="fas fa-arrow-left" style = {{marginRight: "15px"}}></i>
                prev 
              </Button>
              <Button  onClick = {handleClick4} size = "sm" style = {{backgroundColor: "white", color:"#425f75", border: "2px solid #425f75", borderRadius: "5px", float: "right"}}>
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


      return (
        <Container>
          <Row className = "instructions-row">
              {instructions}
          </Row>
          
          <Row>
              <Col style ={{background: "#f3f3f3", border: "3px solid #263238", borderRadius: "30px", marginLeft: "10px", marginTop: "20px"}}>
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
                  <Button className = "run-code-button" variant="outline-success" onClick = {handleClick} style = {{marginLeft: "15px", borderRadius: "10px"}}><i class="fas fa-play" style = {{marginRight: "15px"}}></i>
                      Run Code
                  </Button>
                                          {/* TODO show last event time */}
                  <Button className = "stop-code-button" variant="outline-danger" onClick = {handleClick2} style = {{marginRight: "-15px", borderRadius: "10px"}}><i class="fas fa-stop" style = {{marginRight: "15px"}}></i>
                      Stop Code Execution
                  </Button>
              </Row>
              <Row>
                <div style = {{width: "100%", padding: "10px", marginBottom: "10px"}}>
                  <CodeConsole consoleStrings={props.consoleStrings} sendExecutionInput={props.sendExecutionInput}/>
                </div>
              </Row>
            
            </Col>
            <Col>
            <div className="message-pane" style = {{border: "2px solid #c6e3fa", borderRadius: "30px", marginTop: "20px", padding: "10px"}}>
                <MessageList handleSend = {value => props.sendLearnersChatMessage(value)} 
                             educatorId = {props.educatorId} 
                             chatMessages = {props.chatMessages} 
                             userId = {props.userId} 
                             otherUserId = {props.educatorId} 
                             otherUserName = {props.educatorName}
                             avState = {props.avState}            
                             acceptCall = {props.acceptCall}
                             rejectCall = {props.rejectCall}
                             endCall={props.endCall}
                             /> 
                   {/* TODO  - could change educator to an obj with name and id, and pass that in.
                    * TODO - think about how to seperate out the learners own message from the educators - how it wil work with formating etc.
                    */}
            </div>
            <center className="help-pane" style = {{ float: "bottom", marginTop: "50px", background: "#fedcd6", color: "#565656", minHeight: "150px", border: "1px solid #e1a7ab", borderRadius: "30px", padding: "20px"}}>  
                <h4>Need help?</h4>
                <p>Use the button below to let the instructor know. <br/> They'll get back to you once you're at the front of their help queue.</p>
                <HandRaise openHelpRequest = {props.openHelpRequest} sendHelpRequest={props.sendHelpRequest} sendLearnerCancelsHelpRequest = {props.sendLearnerCancelsHelpRequest}/>
            </center>
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


