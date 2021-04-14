import React from 'react';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/clike/clike";
import { Controlled as ControlledEditor } from 'react-codemirror2';

export default function Editor(props) {

    const {
        language,
        displayName,
        value,
        onChange,
        theme,
    } = props

    function handleChange(editor, data, value){
        onChange(value)
    }
    
    const codemirrorRef = React.useRef();

    React.useEffect(() => {
        codemirrorRef.current.editor.display.wrapper.style.height = props.isEdu ? "300px" : "600px";
        codemirrorRef.current.editor.display.wrapper.style.borderRadius = "30px";
        codemirrorRef.current.editor.display.wrapper.style.padding = "10px";
    });

    return (
        <div className = "editor-containter">
            <h5 className = "editor-title" style = {{paddingLeft: "20px"}}>
                {displayName}
            </h5>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                ref={codemirrorRef}
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: theme,
                    lineNumbers: true
                }}
            />
    
        </div>
    )
}
