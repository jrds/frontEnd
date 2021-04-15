import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/base16-light.css";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Editor from "../components/Editor";
import CodeConsole from "../components/CodeConsole";
import {Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';



export class ZoomInCodeEditor extends Component {

    constructor(props) {
        super(props)

        console.log("ZoomInCodeEditor type is" + (typeof props.sendCodeToCompileMessage))

        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);

        this.state = {active:'learnerCode'}

    }    
    
    render() {
    
        var learnerCodeEditor;
    

        if (this.props.learnerObj.code !== null){
            learnerCodeEditor = 
                <div>
                    <CodeMirror
                        value= {this.props.learnerObj.code}
                        options={{
                            mode: 'xml',
                            theme: 'material',
                            lineNumbers: true,
                            readOnly: true
                        }}
                        />
                </div>
        } else {
            learnerCodeEditor = 
                <div>
                    <CodeMirror
                        value= ''
                        options={{
                            mode: 'xml',
                            theme: 'material',
                            lineNumbers: true,
                            readOnly: true
                        }}
                        />
                </div>
        }

        console.log('rendering code as ' + this.props.myCode);

        return(
            <Tabs activeKey={this.state.active} onSelect={k => this.setState({active: k})}  id="uncontrolled-tab-example">
            <Tab eventKey="learnerCode" title="learnerCode">
               {learnerCodeEditor}
               
                <Button variant="outline-info" block onClick = {this.handleClick3}><i class="fas fa-copy" style = {{paddingRight: "15px"}}></i>Clone to myCode editor</Button>

            </Tab>
            <Tab eventKey="myCode" title="myCode">
                    <div className="top-pane" style = {{minWidth: "800px", height: "100%", padding: "10px", marginLeft: "10px"}} >
                        <Editor 
                            language = "text/x-java"
                            displayName = "Java"
                            value = {this.props.myCode} 
                            onChange = {this.props.setEduCode}
                            theme = "default"
                            isEdu = {true}
                        />
                    </div>

                    <Container>
                        <Row className = "code-button-row">
                            <Button className = "run-code-button" variant="outline-success" onClick = {this.handleClick}><i class="fas fa-play"></i>
                                Run Code
                            </Button>
                            <Button className = "stop-code-button" variant="outline-danger" onClick = {this.handleClick2}><i class="fas fa-stop"></i>
                                Stop Code Execution
                            </Button>
                        </Row>
                            <Row>
                                <CodeConsole consoleStrings={this.props.consoleStrings} sendExecutionInput={this.props.sendExecutionInput} />
                            </Row>  
                    </Container>

            </Tab>
            <Tab eventKey="dif" title="dif">
                <center style = {{height: "300px", width: "100%", backgroundColor: "#f5f5f5", borderRadius: "20px "}}>Future development feature</center>
            </Tab>
        </Tabs>
        

        )
    }

    handleClick(){
        this.props.sendCodeToCompileMessage();
        console.log("Run Code Button Pressed");
      }
      
    handleClick2(){
        this.props.sendTerminateExecutionRequest()
        console.log("Stop Code Execution Pressed");
    }
    
    handleClick3(){
        console.log("cloning: " + this.props.learnerObj.code);
        this.props.setEduCode(this.props.learnerObj.code);
        console.log("Copy Code Button Pressed");
    }
    

}

export default ZoomInCodeEditor
