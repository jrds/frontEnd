import React, { Component } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

export class CodeSectionOfLearnerCard extends Component {

    constructor(props){
        super(props)

        this.state = {
            learnerCardhasRenderedCode: false
        }
    }

    render() {

        if (this.props.code === null){
            return (
                <div>
                    {this.props.name} hasn't started coding yet.
                </div>
            )
        }
        else {
            
            return (
                    <div className = "learner-card-code">
                        <CodeMirror
                            value= {this.props.code}
                            options={{
                                mode: 'xml',
                                theme: 'material',
                                lineNumbers: true,
                                readOnly: true
                            }}
                            />
                    </div>
            )
        }
    }
}

export default CodeSectionOfLearnerCard
