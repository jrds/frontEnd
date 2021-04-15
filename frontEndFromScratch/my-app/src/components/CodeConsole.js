import React, { Component } from 'react';
import autoscroll from 'autoscroll-react'


class CodeConsole extends Component{

  constructor(props) {
    super(props);

    this.state = {
        input: '',
    }
  }

  render(){

    return (
      <div className = "console-content" style = {{borderRadius: "10px"}} >
        <div style = {{ marginLeft : "10px", color: "#4b6972"}}>Code console:</div>
        {this.props.consoleStrings.map((str, idx) => {
          return (
            <div className = {str.type} key={idx} style = {{ marginLeft : "10px"}}>
              {str.text}
            </div>  
          )
        })}
        <input
                className="console-input"
                onKeyDown={ event => {if (event.key === 'Enter') {
                    event.preventDefault()
                    this.props.sendExecutionInput(event.target.value + '\n')
                    event.target.value = ''
                  }}}
                type='text'
                autoComplete='off'
                style = {{color: "#c3e88d"}}
              />
      </div>
        )
    }
}

export default autoscroll(CodeConsole)