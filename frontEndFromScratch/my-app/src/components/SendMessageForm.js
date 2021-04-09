import React, { Component } from 'react'


class SendMessageForm extends Component {
 
    constructor(props) {
        super(props)
        this.state = {
          message: '',
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
      if (this.props.userId === this.props.educatorId){
        this.props.sendChatMessage(this.state.message, this.props.learnerId)
      }
      else {
        this.props.sendChatMessage(this.state.message)
      }
      this.setState({
        message: '',
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



  