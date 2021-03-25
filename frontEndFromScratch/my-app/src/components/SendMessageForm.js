import React, { Component } from 'react'


class SendMessageForm extends React.Component {
    

    constructor(props) {
        super(props)
        this.state = {
          message: '',
          messageCounter: 500
        }
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeMessage(e) {
      this.setState({
        message: e.target.value
      })
  }

  onSubmit(e) {
      e.preventDefault();
      this.props.ws.send(JSON.stringify({
        id: this.state.messageCounter, 
        from:this.props.userId,
        to:this.props.educatorId,
        text:this.state.message, 
        _type:"ChatMessage"}
      ))
      this.setState({
        message: '',
        messageCounter: this.state.messageCounter + 1
      })
    console.log("ChatMessage Pressed")
  }   

    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <div>
            <input
                type="text"
                name = "message"
                placeholder="Type your message and click the send button"
                required
                value={this.state.message}
                onChange={this.onChangeMessage}/>
          </div>
          <br />
          <label>{this.props.loginError}</label>
          <br />
          <div className="form-group">
            <input type="submit" value="Send"/>
          </div>
        </form> 
      )
    }
  }

  
  export default SendMessageForm



  