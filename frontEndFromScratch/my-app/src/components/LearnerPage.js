import React, { Component, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';  
import Editor from "../components/Editor";
import Instruction from "./Instruction";

function LearnerPage(props) {

  const [code, setCode] = useState("")
    

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
                  value={code} 
                  onChange={setCode}
                />
                </div>
              </Row>
              <Row>
                <div>
                  <iframe 
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="50%"
                    height="30%"
                  />
                </div>
              </Row>
            </Col>
          </Row>
      </Container>
      )

    }
}


export default LearnerPage;


