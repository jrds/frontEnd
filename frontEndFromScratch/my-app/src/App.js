import './App.css';
import React, { Component } from 'react';
import LoginPage from './components/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LearnerPage from './components/LearnerPage';
import EducatorPage from './components/EducatorPage';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ws: null,
      loggedIn: false,
      loginError: "",
      userId: "",
      lessonId: "",
      educatorId: "",
      role:"",
      lessonState: "NOT_STARTED",
      openHelpRequest: false,
      instructions: [],
      chatMessages: []
    };
  }

  timeout = 250; // Initial timeout duration as a class variable


  connect = (userId, password, lessonId) => {
    console.log("connecting to websocket");
    this.setState({userId, lessonId});
    var ws = new WebSocket(`ws://${userId}:${password}@localhost:8080/lesson/${lessonId}`);
    let that = this; // cache the this
    var connectInterval;


    // websocket onopen event listener
    ws.onopen = () => {
      if (this.state.loggedIn)
      {
        console.log("Weird - should not open again unless we've added retry logic.");
      }
      else
      {        
        console.log("Login: connect successful - sending session start.");
        ws.send(JSON.stringify({id:0, from:this.state.userId, _type:"SessionStartMessage"}));
      }
      console.log("connected websocket main component");

      this.setState({ ws: ws });

      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };


    ws.onmessage = e => {
      console.log(e.data);
      var msg = JSON.parse(e.data);
      // msg id 0 ALWAYS = SessionStartMessage
      if (msg.id === 0 && msg._type === "SessionStartResponseMessage")
      {
        console.log("Login: success response received")
        this.setState({
          loginError:"", 
          loggedIn:true,
          role: msg.role,
          lessonState: msg.lessonState})
        console.log(this.state)
      }
      else if (msg._type === "LearnerLessonStateMessage")
      {
          console.log("update to state message received")
          this.setState({
            openHelpRequest: msg.openHelpRequestForThisLearner,
            lessonState: msg.activeLessonState,
            instructions: msg.instructionsSent,
            educatorId: msg.educatorId
          })
      }
      // msg id 1 ALWAYS = StartLessonMessage from educator
      else if (msg.id === 1)
      {
          console.log("Start lesson success message received")
          this.setState({
            lessonState: "IN_PROGRESS"
          })
      }
      else if (msg._type === "InstructionMessage"){
          console.log("Instruction received")
          this.setState({instructions: [...this.state.instructions, msg.instruction]});
     }
      else if (msg._type === "ChatMessage"){
          console.log ("Chat Message received")
          this.setState({ 
            chatMessages: [...this.state.chatMessages, {
                                                          text: msg.text,
                                                          senderId: msg.from,
                                                          id:  msg.id
                                                          
          }]})
          // ************************************************************************** TODO **************************************************************************
          // need to write logic for managing the to and from, moreSo for Educator, maybe time stamp them too - need to write a js component representing a message and then create a new obj here. 
      }
      else if(msg._type === "FailureMessage"){
          console.log("Failure Message received")
          console.log(msg.failureReason)
      }
      else if(msg._type === "SuccessMessage"){
          console.log("Success Meassage Recieved for message id: " + msg.id)
      }
      else
      {
        console.log("Login: failure response received")
        this.setState({loginError:msg.failureReason, loggedIn:false})
      }
    }


    // websocket onclose event listener
    ws.onclose = e => {
      if (this.state.loggedIn)
      {
        console.log("Socket has failed.");
        // Maybe add reconnect logic here (In commit: 9991a49e1174dd8c4abc2782b43e27624b3ad32f)
      }
      else
      {        
        console.log("Loggin failed.");
        this.setState({loginError: "Login failed."})
      }
    };

  };


  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  sendRequest = request => {
    const { ws } = this.state; 
  }

  render() {
    if (this.state.loggedIn)
    {
      if(this.state.role === "LEARNER") {
        return (<LearnerPage lessonState={this.state.lessonState} instructions={this.state.instructions} educatorId={this.state.educatorId} userId = {this.state.userId} ws={this.state.ws} chatMessages = {this.state.chatMessages}/>);
      }
      else if (this.state.role === "EDUCATOR"){
        return (<EducatorPage ws={this.state.ws} userId={this.state.userId} lessonState={this.state.lessonState} chatMessages = {this.state.chatMessages}/>);
      }
    }
    else
    {
      return (<LoginPage connect={this.connect.bind(this)} loginError={this.state.loginError}/>)
    }
  }
}


export default App;
