import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";


export class Thumbnailable extends Component {
    render() {
        if(this.props.learnerObj.code !== null)
        {
            return (
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
        )}
        else {
            return (
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
            )
        }
    }
}

export default Thumbnailable
