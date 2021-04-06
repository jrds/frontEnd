import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";


export class Thumbnailable extends Component {
    render() {
        return (
            <div>
                <div>
                <CodeMirror
                    value= {this.props.learnerCode}
                    options={{
                        mode: 'xml',
                        theme: 'material',
                        lineNumbers: true,
                        readOnly: true
                    }}
                    />
                </div>

                

            </div>
        )
    }
}

export default Thumbnailable
