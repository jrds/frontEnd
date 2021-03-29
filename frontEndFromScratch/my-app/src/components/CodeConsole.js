import React, { Component } from 'react';

export default class CodeConsole extends Component{

  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
 
    this.state = {
        input: '',
    }
  }
  
  onChangeInput(e) {
      this.setState({
        input: e.target.value + "\n"
      })
  }  

  render(){
    return (
      <div className = "console-content">
        {this.props.consoleStrings.map((str, idx) => {
          return (
            <div className = {str.type} key={idx}>
              {str.text}
            </div>  
          )
        })}
        <input
                className="console-input"
                onKeyDown={ event => {if (event.key === 'Enter') {
                  event.preventDefault()
                  this.props.sendExecutionInput(this.state.input)}}}
                type='text'
                autoComplete='off'
                onChange = {this.onChangeInput}
              />
      </div>
        )
    }
}
