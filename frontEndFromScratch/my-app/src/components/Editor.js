import React from 'react';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/clike/clike";
import { Controlled as ControlledEditor } from 'react-codemirror2';

export default function Editor(props) {

    const {
        language,
        displayName,
        value,
        onChange
    } = props

    function handleChange(editor, data, value){
        onChange(value)
    }
    
    const codemirrorRef = React.useRef();

    React.useEffect(() => {
    const current = codemirrorRef.current.editor.display.wrapper.style.height = "600px";
    });

    return (
        <div className = "editor-containter">
            <div className = "editor-title">
                {displayName}
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                ref={codemirrorRef}
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: "material",
                    lineNumbers: true
                }}
            />
    
        </div>
    )
}
