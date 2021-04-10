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
      lessonId: "",
      educatorId: "",
      role:"",
      lessonState: "NOT_STARTED",
      learners: [],
      detailsByLearner: new Map(),
  
      loggedIn: false,
      loginError: "",
      userId: "",

      instructions: [],
      chatMessages: [],
      
      openHelpRequest: false,
      openHelpRequests: [],
      
      code: "",
      codeChanged: false,
      consoleStrings: [],
      timeLastCompiled: "",
      learnersLiveCode: new Map(),
      
      sessionStartMsgId: 0,
      lessonStartMsgId: 1,
      messageCounter: 4,
      helpRequestCounter: 10000,

      dummyLearners: [{name: "Jordan", age:29}, {name: "BanBan", age:21}, {name: "Jack", age:29}]

    };
  }

  timeout = 250; // Initial timeout duration as a class variable


  connect = (userId, password, lessonId) => {
    console.log("connecting to websocket");
    this.setState({userId, lessonId});
    var ws = new WebSocket(`ws://${userId}:${password}@${window.location.hostname}:8080/lesson/${lessonId}`);
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
        ws.send(JSON.stringify({id:this.state.sessionStartMsgId, from:this.state.userId, _type:"SessionStartRequest"}));
      }
      console.log("connected websocket main component");

      this.setState({ ws: ws });

      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };


    ws.onmessage = e => {
      console.log(e.data);
      var msg = JSON.parse(e.data);
      
      if (msg.id === this.state.sessionStartMsgId && msg._type === "SessionStartResponse")
      {
        console.log("Login: success response received")
       
        this.setState({
          loginError:"", 
          loggedIn:true,
          role: msg.role,
          lessonState: msg.lessonState})
      
        console.log(this.state);
          
        setInterval(()=> {if(this.state.codeChanged) { this.sendLiveCodeMessage()}}, 1000);
      }


      else if (msg._type === "LearnerLessonStateInfo")
      {
        console.log("update to state message received")
        
        this.setState({
          lessonState: msg.activeLessonState,
          instructions: msg.instructionsSent,
          educatorId: msg.educatorId
        })

        if (msg.helpRequestStatus === "NEW" || msg.helpRequestStatus === "IN_P"){
          this.setState({openHelpRequest: true})  
        } else {
          this.setState({openHelpRequest: false})
        }
      }
      else if (msg.id === this.state.lessonStartMsgId)
      {
          console.log("Start lesson success message received")
          
          this.setState({
            lessonState: "IN_PROGRESS"
          })
      }
      
      else if (msg._type === "InstructionInfo"){
          console.log("Instruction received")
          
          this.setState({instructions: [...this.state.instructions, msg.instruction]});
     }

     else if(msg._type === "LearnersInfo")
     {
          console.log("Learners Info received")

          var learners = [];
          msg.learnersInAttendance.forEach(l => learners.push({id:l.id, name:l.name, attending:true}));
          msg.learnersExpected.forEach(l => learners.push({id:l.id, name:l.name, attending:false}));
          
          var newDetailsByLearner = new Map(this.state.detailsByLearner);
          learners.forEach(l => { 
            if(!newDetailsByLearner.has(l.id))
            {
              newDetailsByLearner.set(l.id, {
                id: l.id,
                name: l.name,
                code: null
                //add extra info to here 
                //help request
                //unreadmessages boolean //TODO
              })
            }
          });

        this.setState({
          learners: learners,
          detailsByLearner: newDetailsByLearner
        })
          
     }
      
      else if (msg._type === "ChatMessage"){
          console.log ("Chat Message received")
          
          this.setState({ 
            chatMessages: [...this.state.chatMessages, {text: msg.text, from: msg.from, to: msg.to, id: msg.id, status:"Received"}]
          })
          // ************************************************************************** TODO **************************************************************************
          // need to write logic for managing the to and from, moreSo for Educator, maybe time stamp them too? - 
      }
      else if(msg._type === "FailureResponse"){
          console.log("Failure Response received")
          console.log(msg.failureReason)
      }
      else if(msg._type === "SuccessResponse"){
          console.log("Success Response Recieved for message id: " + msg.id)
      }
      else if(msg._type === "CodeExecutionInfo"){
        console.log("CodeExecutionInfo Recieved")
        var newStrings = [];
        if (msg.executionErrorOutput !== "")
        {
          newStrings.push( {type:'stderr', text:msg.executionErrorOutput})
        }
        if (msg.executionOutput !== "")
        {
          newStrings.push( {type:'stdout', text:msg.executionOutput})
        }
        this.setState({
          consoleStrings: [...this.state.consoleStrings, ...newStrings],
          timeLastCompiled: msg.executionEventTime
        })

      } 
      else if(msg._type === "OpenHelpRequestsInfo"){
        this.setState({
          openHelpRequests: [...msg.openHelpRequests]
        })
        console.log("Open Help Requests Info message received" + msg)
      }
      else if(msg._type === "LatestLearnerCodeInfo"){
        this.state.detailsByLearner.get(msg.learner).code = msg.latestCode;
        this.setState({
          learnersLiveCode: new Map(this.state.learnersLiveCode.set(msg.learner, msg.latestCode)),
          detailsByLearner: new Map(this.state.detailsByLearner)

        })

        console.log(this.state.detailsByLearner)
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

/*   sendRequest = request => {
    const { ws } = this.state; 
  } */

 
  setCode = (code) => {
    this.setState({
      code: code,
      codeChanged: true
    });
    console.log(code);
  }

  sendLiveCodeMessage = () => {
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter, 
      from:this.state.userId,
      latestCode: this.state.code, 
      _type:"UpdateLiveCodeRequest"}
    ));
    this.incrementMessageCounter();
    this.setState({
      codeChanged: false
    });
  }

  incrementMessageCounter = () => {
    this.setState({
      messageCounter : this.state.messageCounter + 1
    });
  };

  sendLearnersChatMessage = (messageText) =>
  { 
    this.setState({ 
      chatMessages: [...this.state.chatMessages, {text: messageText, from: this.state.userId, to: this.state.educatorId, id: this.state.messageCounter, status:"Pending"}]                      
    }) //TODO - want to add concept of time here, to be able to sort the messsages by time, and will be useful for the educator to see how long it's been since a message was last sent etc.
            //  need to check if there's already an Instant or time being calculated on the back end, if so will just need to add to the chat message's variables. 
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter, 
      from:this.state.userId,
      to:this.state.educatorId,
      text: messageText, 
      _type:"ChatMessage"}
    ))
    
    this.incrementMessageCounter()
  }

  sendEducatorsChatMessage = (messageText, learnerId) =>
  { 
    this.setState({ 
      chatMessages: [...this.state.chatMessages, {text: messageText, from: this.state.userId, to: learnerId, id: this.state.messageCounter, status:"Pending"}]                      
    }) //TODO - want to add concept of time here, to be able to sort the messsages by time, and will be useful for the educator to see how long it's been since a message was last sent etc.
            //  need to check if there's already an Instant or time being calculated on the back end, if so will just need to add to the chat message's variables. 
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter, 
      from:this.state.userId,
      to: learnerId,
      text: messageText, 
      _type:"ChatMessage"}
    ))
    this.incrementMessageCounter()
  }

  sendExecutionInput = (input) => {
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      input: input, 
      _type: "CodeExecutionInputRequest"
    }))

    this.incrementMessageCounter()
  }


  sendCodeToCompileMessage = () =>
  {
    this.setState({
      consoleStrings: []      
    })

    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      codeToExecute: this.state.code, 
      _type: "ExecuteCodeRequest"
    }))

    this.incrementMessageCounter()
  }

  sendTerminateExecutionRequest = () => {

    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      _type: "TerminateExecutionRequest"
    }))

    this.incrementMessageCounter()
  }

  // Only learners can do this:
  sendHelpRequest = () => {
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      _type: "NewHelpRequest"
    }))

    this.incrementMessageCounter()
  }

  sendLearnerCancelsHelpRequest = () => {
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      learnerId: this.state.userId,
      _type: "CancelHelpRequest"
    }))

    this.incrementMessageCounter()
  }

  sendEducatorCancelsHelpRequest = (learnerToCloseHelpReq) => {
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      learnerId: learnerToCloseHelpReq,
      _type: "CancelHelpRequest"
    }))

    this.incrementMessageCounter()
  }

  // only educators can do this:
  sendUpdateHelpRequest = (learnerToUpdateHelpReq, status) => {
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      learnerId: learnerToUpdateHelpReq,
      status: status,
      _type: "UpdateHelpStatusRequest"
    }))

    this.incrementMessageCounter()
  }


  render() {
    if (this.state.loggedIn)
    {
      if(this.state.role === "LEARNER") {
        return (<LearnerPage 
            lessonState={this.state.lessonState} 
            instructions={this.state.instructions} 
            educatorId={this.state.educatorId} 
            userId = {this.state.userId} 
            ws={this.state.ws} 
            chatMessages = {this.state.chatMessages}
            code = {this.state.code}
            setCode = {this.setCode}
            sendLearnersChatMessage = {this.sendLearnersChatMessage}
            sendCodeToCompileMessage = {this.sendCodeToCompileMessage}
            sendExecutionInput = {this.sendExecutionInput}
            consoleStrings = {this.state.consoleStrings}
            timeLastCompiled = {this.state.timeLastCompiled}
            sendTerminateExecutionRequest = {this.sendTerminateExecutionRequest}
            openHelpRequest = {this.state.openHelpRequest}
            sendHelpRequest = {this.sendHelpRequest}
            sendLearnerCancelsHelpRequest = {this.sendLearnerCancelsHelpRequest}
            />);
      }
      else if (this.state.role === "EDUCATOR"){
        return (<EducatorPage  
            ws={this.state.ws} 
            userId={this.state.userId} 
            lessonState={this.state.lessonState} 
            chatMessages = {this.state.chatMessages}
            //activeLearners = {this.state.activeLearners}
            learners = {this.state.learners}
            detailsByLearner = {this.state.detailsByLearner}
            openHelpRequests = {this.state.openHelpRequests}
            sendUpdateHelpRequest = {this.sendUpdateHelpRequest}
            sendEducatorCancelsHelpRequest = {this.sendEducatorCancelsHelpRequest}
            educatorId={this.state.userId}
            sendEducatorsChatMessage = {this.sendEducatorsChatMessage} 
            learnersLiveCode = {this.state.learnersLiveCode}
            
        />);
      }
    }
    else
    {
      return (<LoginPage connect={this.connect.bind(this)} loginError={this.state.loginError}/>)
    }
  }
}
 

export default App;
