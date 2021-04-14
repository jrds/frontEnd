import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/base16-light.css";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Editor from "../components/Editor";


export class ZoomInCodeEditor extends Component {

   
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

    
        return(
            <Tabs defaultActiveKey="learnerCode" id="uncontrolled-tab-example">
            <Tab eventKey="learnerCode" title="learnerCode">
               {learnerCodeEditor}
            </Tab>
            <Tab eventKey="myCode" title="myCode">
                    <div className="top-pane" style = {{minWidth: "800px", height: "100%", padding: "10px"}} >
                        <Editor 
                            language = "text/x-java"
                            displayName = "Java"
                            value = {this.props.myCode} 
                            onChange = {this.props.setMyCode}
                            theme = "default"
                            isEdu = {true}
                        />
                    </div>
            </Tab>
            <Tab eventKey="dif" title="dif">
                <center style = {{height: "300px", width: "100%", backgroundColor: "#f5f5f5", borderRadius: "20px "}}>Future development feature</center>
            </Tab>
        </Tabs>
        

        )
    }
}

export default ZoomInCodeEditor
