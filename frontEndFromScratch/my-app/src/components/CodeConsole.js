import React from 'react';

function CodeConsole(props) {
  return (
    <div className = "console-content">
      {props.consoleStrings.map((str, idx) => {
        return (
          <div className = {str.type} key={idx}>
            {str.text}
          </div>  
        )
      })}
      <input
              className="console-input"
              onKeyDown={event => {if (event.key === 'Enter') props.sendExecutionInput("Helloooo")}}
              type='text'
              autoComplete='off'
            />
    </div>
  );
}

export default CodeConsole;


