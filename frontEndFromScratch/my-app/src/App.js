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
      educatorName: "Prof", //TODO  - send name from server
      lessonName: "The Circle App", //TODO  - send name from server
      role: "",
      lessonState: "NOT_STARTED",
      learners: [],
      detailsByLearner: new Map(),

      loggedIn: false,
      loginError: "",
      userId: "",
      instructions: [],
      instructionDisplayed: 1,
      finishedAllInstructions: false,
      chatMessages: [],

      openHelpRequest: false,
      openHelpRequests: [],

      code: "",
      codeChanged: false,
      consoleStrings: [],
      eduCode: new Map(), 
      timeLastCompiled: "",
      learnersLiveCode: new Map(),

      sessionStartMsgId: 0,
      lessonStartMsgId: 1,
      messageCounter: 4,
      helpRequestCounter: 10000,
      avState: { state: "none" },
    };
  }
  timeout = 250; // Initial timeout duration as a class variable

  connect = (userId, password, lessonId) => {
    console.log("connecting to websocket");
    this.setState({ userId, lessonId });
    var ws = new WebSocket(`wss://${userId}:${password}@${window.location.hostname}:8443/lesson/${lessonId}`);
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      if (this.state.loggedIn) {
        console.log("Weird - should not open again unless we've added retry logic.");
      }
      else {
        console.log("Login: connect successful - sending session start.");
        ws.send(JSON.stringify({ id: this.state.sessionStartMsgId, from: this.state.userId, _type: "SessionStartRequest" }));
      }
      console.log("connected websocket main component");
      this.setState({ ws: ws });
      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onmessage = e => {
      console.log(e.data);
      var msg = JSON.parse(e.data);

      if (msg.id === this.state.sessionStartMsgId && msg._type === "SessionStartResponse") {
        console.log("Login: success response received")

        this.setState({
          loginError: "",
          loggedIn: true,
          role: msg.role,
          lessonState: msg.lessonState
        })

        console.log(this.state);

        setInterval(() => { if (this.state.codeChanged) { this.sendLiveCodeMessage() } }, 1000);
      }

      else if (msg._type === "LearnerLessonStateInfo") {
        console.log("update to state message received")

        this.setState({
          lessonState: msg.activeLessonState,
          instructions: msg.instructionsSent,
          educatorId: msg.educatorId
        })
        if (msg.helpRequestStatus === "NEW" || msg.helpRequestStatus === "IN_P") {
          this.setState({ openHelpRequest: true })
        } else {
          this.setState({ openHelpRequest: false })
        }
      }
      else if (msg.id === this.state.lessonStartMsgId) {
        console.log("Start lesson success message received")

        this.setState({
          lessonState: "IN_PROGRESS"
        })
      }

      else if (msg._type === "InstructionInfo") {
        console.log("Instruction received")

        this.setState({ instructions: [...this.state.instructions, msg.instruction] });
      }
      else if (msg._type === "LearnersInfo") {
        console.log("Learners Info received")
        var learners = [];
        msg.learnersInAttendance.forEach(l => learners.push({ id: l.id, name: l.name, attending: true }));
        msg.learnersExpected.forEach(l => learners.push({ id: l.id, name: l.name, attending: false }));

        var newDetailsByLearner = new Map(this.state.detailsByLearner);
        learners.forEach(l => {
          if (!newDetailsByLearner.has(l.id)) {
            newDetailsByLearner.set(l.id, {
              id: l.id,
              name: l.name,
              code: null
              //add extra info to here 
              //help request
              //unreadmessages boolean //TODO
            })
          }
          if (!this.state.eduCode.has(l.id)){
            this.state.eduCode.set(l.id, "")
          }
        });
        this.setState({
          learners: learners,
          detailsByLearner: newDetailsByLearner
        })

      }

      else if (msg._type === "ChatMessage") {
        console.log("Chat Message received")

        this.setState({
          chatMessages: [...this.state.chatMessages, { text: msg.text, from: msg.from, to: msg.to, id: msg.id, status: "Received" }]
        })
        // ************************************************************************** TODO **************************************************************************
        // need to write logic for managing the to and from, moreSo for Educator, maybe time stamp them too? - 
      }
      else if (msg._type === "AVOffer") {
        console.log("AVOffer Message received");
        if (this.state.avState.state === "none") {
          this.setState({
            avState: Object.assign({}, this.state.avState, {
              state: "offerReceived",
              to: msg.from,
              type: msg.type,
              offer: JSON.parse(msg.offer)
            })
          });
        }
      }

      else if (msg._type === "AVIceCandidate") {
        console.log("AVIceCandidate Message received");
        console.log(this.state.avState.state);
        if (this.state.avState.peerConnection) {
          this.state.avState.peerConnection.addIceCandidate(JSON.parse(msg.content));
        }
      }

      else if (msg._type === "AVAnswer") {
        console.log("AVAnswer Message received");
        console.log(this.state.avState.state);
        if (this.state.avState.state === "offering") {
          this.setState({ avState: Object.assign({}, this.state.avState, { answer: JSON.parse(msg.answer) }) });
          this.callAccepted();
        }
      }

      else if (msg._type === "AVReject") {
        console.log("AVReject Message received")
        if (this.state.avState.state === "offering") {
          this.streamFailed("Call declined")
        }
      }

      else if (msg._type === "AVClose"){
        console.log("AVClose Message Receieved")
        
        if (this.state.myStream)
        {
          this.state.myStream.getTracks().forEach(track => track.stop());
        }

        this.setState({ avState: { state: "none" } });
      }
      else if (msg._type === "FailureResponse") {
        console.log("Failure Response received")
        console.log(msg.failureReason)
        if (msg.failureReason === "Not a valid class definition"){
          //TODO
          this.setState({
            consoleStrings: [{type: "invalidClass", text: "****** NOT A VALID CLASS DEFINITION ******"}]
          })
          
        }
      }
      else if (msg._type === "SuccessResponse") {
        console.log("Success Response Recieved for message id: " + msg.id)
      }
      else if (msg._type === "CodeExecutionInfo") {
        console.log("CodeExecutionInfo Recieved")
        var newStrings = [];
        if (msg.executionErrorOutput !== "") {
          newStrings.push({ type: 'stderr', text: msg.executionErrorOutput })
        }
        if (msg.executionOutput !== "") {
          newStrings.push({ type: 'stdout', text: msg.executionOutput })
        }
        this.setState({
          consoleStrings: [...this.state.consoleStrings, ...newStrings],
          timeLastCompiled: msg.executionEventTime
        })
      }
      else if (msg._type === "OpenHelpRequestsInfo") {
        this.setState({
          openHelpRequests: [...msg.openHelpRequests]
        })
        console.log("Open Help Requests Info message received" + msg)
      }
      else if (msg._type === "LatestLearnerCodeInfo") {
        this.state.detailsByLearner.get(msg.learner).code = msg.latestCode;
        this.setState({
          learnersLiveCode: new Map(this.state.learnersLiveCode.set(msg.learner, msg.latestCode)),
          detailsByLearner: new Map(this.state.detailsByLearner)
        })
        console.log(this.state.detailsByLearner)
      }
      else {
        console.log("Login: failure response received")
        this.setState({ loginError: msg.failureReason, loggedIn: false })
      }

    }

    // websocket onclose event listener
    ws.onclose = e => {
      if (this.state.loggedIn) {
        console.log("Socket has failed.");
        // Maybe add reconnect logic here (In commit: 9991a49e1174dd8c4abc2782b43e27624b3ad32f)
      }
      else {
        console.log("Loggin failed.");
        this.setState({ loginError: "Login failed." })
      }
    };
  };

  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };
  /*   sendRequest = request => {
      const { ws } = this.state; 
    } */

  setCode = (code) => {
    this.setState({
      code: code,
      codeChanged: true
    });
    console.log(code);
  }

  setEduCode = (code, learnerId) => {
    console.log("new code :" + code);
    this.setState({
      eduCode: new Map(this.state.eduCode.set(learnerId, code))
    })
  }

  updateEduCodeToCode = (learnerId) => {
    this.setState({
      code: this.state.eduCode.get(learnerId)
    })
  }

  sendLiveCodeMessage = () => {
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      latestCode: this.state.code,
      _type: "UpdateLiveCodeRequest"
    }
    ));
    this.incrementMessageCounter();
    this.setState({
      codeChanged: false
    });
  }
  incrementMessageCounter = () => {
    this.setState({
      messageCounter: this.state.messageCounter + 1
    });
  };

  nextInstruction = () => {
    if (this.state.instructionDisplayed === this.state.instructions.length) {
      this.setState({
        finishedAllInstructions: true
      })
    } else {
      this.setState({
        instructionDisplayed: this.state.instructionDisplayed + 1
      })
    }
  }

  prevInstruction = () => {
    if (this.state.instructionDisplayed === this.state.instructions.length) {
      this.setState({
        finishedAllInstructions: false,
        instructionDisplayed: this.state.instructionDisplayed - 1
      })
    } else if (this.state.instructionDisplayed === 1) {
      // do nothing 
    } else {
      this.setState({
        instructionDisplayed: this.state.instructionDisplayed - 1
      })
    }
  }

  sendLearnersChatMessage = (messageText) => {
    this.setState({
      chatMessages: [...this.state.chatMessages, { text: messageText, from: this.state.userId, to: this.state.educatorId, id: this.state.messageCounter, status: "Pending" }]
    }) //TODO - want to add concept of time here, to be able to sort the messsages by time, and will be useful for the educator to see how long it's been since a message was last sent etc.
    //  need to check if there's already an Instant or time being calculated on the back end, if so will just need to add to the chat message's variables. 
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      to: this.state.educatorId,
      text: messageText,
      _type: "ChatMessage"
    }
    ))

    this.incrementMessageCounter()
  }

  sendEducatorsChatMessage = (messageText, learnerId) => {
    this.setState({
      chatMessages: [...this.state.chatMessages, { text: messageText, from: this.state.userId, to: learnerId, id: this.state.messageCounter, status: "Pending" }]
    }) //TODO - want to add concept of time here, to be able to sort the messsages by time, and will be useful for the educator to see how long it's been since a message was last sent etc.
    //  need to check if there's already an Instant or time being calculated on the back end, if so will just need to add to the chat message's variables. 
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      to: learnerId,
      text: messageText,
      _type: "ChatMessage"
    }
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

  sendCodeToCompileMessage = () => {
    this.doSendCodeToCompileMessage(this.state.code);
  }

  sendEduCodeToCompileMessage = (learnerId) => {
    this.doSendCodeToCompileMessage(this.state.eduCode.get(learnerId));
  }

  doSendCodeToCompileMessage = (code) => {
    this.setState({
      consoleStrings: []
    })
    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      codeToExecute: code,
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

  // Only learners can do this:
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
  
  // only educators can do this:
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
  
  // AV Functions

  educatorStartCall = (type, learnerId) => {
    this.setState({ avState: { state: "initiating", type, to: learnerId } });
    this.startStreams(stream => setTimeout(() => this.makeOffer(stream), 1500));
  }

  startStreams = (callback) => {
    var streams = this.state.avState.type === "audio" ? { audio: true } : { video: true, audio: true };
    window.navigator.mediaDevices.getUserMedia(streams)
      .then(stream => {
        this.setState({myStream:stream});
        callback(stream)
      })
      .catch(reason => this.streamFailed(reason))
  }

  acceptCall = () => {
    this.startStreams(stream => {
      const peerConnection = this.createPeerConnection(stream);

      peerConnection.setRemoteDescription(this.state.avState.offer)
        .then(() => peerConnection.createAnswer())
        .then(answer => {
          this.setState({ avState: Object.assign({}, this.state.avState, {answer}) });
          return peerConnection.setLocalDescription(answer);
        })
        .then(() => {
          console.log("Answering")

          console.log(this.state.avState.state)

          if (this.state.avState.state === "offerReceived") {

            this.state.ws.send(JSON.stringify({
              id: this.state.messageCounter,
              from: this.state.userId,
              to: this.state.avState.to,
              type: this.state.avState.type,
              answer: JSON.stringify(this.state.avState.answer),
              _type: "AVAnswer"
            }));

            this.incrementMessageCounter();
            this.setState({ avState: Object.assign({}, this.state.avState, { state: "streaming" }) });
          }
        })
        .catch(reason => this.streamFailed(reason))
    });
  }

  rejectCall = () => {
    console.log("Rejecting")

    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      to: this.state.avState.to,
      type: this.state.avState.type,
      _type: "AVReject"
    }));
    this.incrementMessageCounter();
    this.setState({ avState: { state: "none" } });
  }

  cancelCall = () => {
    this.setState({ avState: { state: "none" } });
  }

  endCall = () => {

    console.log("Ending call")

    var peerConnection = this.state.avState.peerConnection;

    if (peerConnection) {
      peerConnection.ontrack = null;
      peerConnection.onremovetrack = null;
      peerConnection.onremovestream = null;
      peerConnection.onicecandidate = null;
      peerConnection.oniceconnectionstatechange = null;
      peerConnection.onsignalingstatechange = null;
      peerConnection.onicegatheringstatechange = null;
      peerConnection.onnegotiationneeded = null;
       
      if (this.state.myStream)
      {
        this.state.myStream.getTracks().forEach(track => track.stop());
      }
    
      peerConnection.close();
      peerConnection = null;
    }
  
    // remoteVideo.removeAttribute("src");
    // remoteVideo.removeAttribute("srcObject");
    // localVideo.removeAttribute("src");
    // remoteVideo.removeAttribute("srcObject");
  
    //document.getElementById("hangup-button").disabled = true;
    //targetUsername = null;

    this.state.ws.send(JSON.stringify({
      id: this.state.messageCounter,
      from: this.state.userId,
      to: this.state.avState.to,
      type: this.state.avState.type,
      _type: "AVClose"
    }));

    this.incrementMessageCounter();
    this.setState({ avState: { state: "none" } });

  }

  makeOffer = (stream) => {
    const peerConnection = this.createPeerConnection(stream);

    peerConnection.createOffer()
      .then(offer => {
        console.log("Offer created")
        this.setState({ avState: Object.assign({}, this.state.avState, {offer}) });
        return peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        console.log("Making offer")
        if (this.state.avState.state === "initiating") {
          this.state.ws.send(JSON.stringify({
            id: this.state.messageCounter,
            from: this.state.userId,
            to: this.state.avState.to,
            type: this.state.avState.type,
            offer: JSON.stringify(this.state.avState.offer),
            _type: "AVOffer"
          }));
          this.setState({ avState: Object.assign({}, this.state.avState, { state: "offering" }) });
          this.incrementMessageCounter();
        }
      })
      .catch(reason => this.streamFailed(reason))
  }

  createPeerConnection = (stream) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    this.setState({ avState: Object.assign({}, this.state.avState, {peerConnection}) });
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

    peerConnection.ontrack = (event) => {
      console.log("ontrack happened")
      this.setState({ avState: Object.assign({}, this.state.avState, { stream: event.streams[0] }) });
    };

    peerConnection.onicecandidate = (iceEvent) => {
      if (iceEvent && iceEvent.candidate) {
        this.state.ws.send(JSON.stringify({
          id: this.state.messageCounter,
          from: this.state.userId,
          to: this.state.avState.to,
          type: this.state.avState.type,
          content: JSON.stringify(iceEvent.candidate),
          _type: "AVIceCandidate"
        }));

        this.incrementMessageCounter();
      }
    };
    return peerConnection;
  }

  callAccepted = () => {
    console.log(this.state.avState);
    this.state.avState.peerConnection.setRemoteDescription(this.state.avState.answer)
      .then(() => {
        this.setState({ avState: Object.assign({}, this.state.avState, { state: "streaming" }) });
      })
      .catch(reason => this.streamFailed(reason))
  }

  streamFailed = (reason) => {
    var text = typeof reason === "string" ? reason : reason.toString();
    console.log("video failed: " + text);
    if (this.state.myStream)
    {
      this.state.myStream.getTracks().forEach(track => track.stop());
    }
this.setState({ avState: Object.assign({}, this.state.avState, { state: "failed", reason: text }) });
  }

  render() {

    console.log("APP type is" + (typeof this.sendCodeToCompileMessage))


    if (this.state.loggedIn) {
      if (this.state.role === "LEARNER") {
        return (<LearnerPage
          lessonState={this.state.lessonState}
          instructions={this.state.instructions}
          instructionDisplayed={this.state.instructionDisplayed}
          nextInstruction={this.nextInstruction}
          prevInstruction={this.prevInstruction}
          finishedAllInstructions={this.state.finishedAllInstructions}
          educatorId={this.state.educatorId}
          educatorName={this.state.educatorName}
          userId={this.state.userId}
          ws={this.state.ws}
          chatMessages={this.state.chatMessages}
          code={this.state.code}
          setCode={this.setCode}
          sendLearnersChatMessage={this.sendLearnersChatMessage}
          sendCodeToCompileMessage={this.sendCodeToCompileMessage}
          sendExecutionInput={this.sendExecutionInput}
          consoleStrings={this.state.consoleStrings}
          timeLastCompiled={this.state.timeLastCompiled}
          sendTerminateExecutionRequest={this.sendTerminateExecutionRequest}
          openHelpRequest={this.state.openHelpRequest}
          sendHelpRequest={this.sendHelpRequest}
          sendLearnerCancelsHelpRequest={this.sendLearnerCancelsHelpRequest}
          avState={this.state.avState}
          learnerStartCall={this.learnerStartCall}
          acceptCall={this.acceptCall}
          rejectCall={this.rejectCall}
          endCall={this.endCall}
        />);
      }
      else if (this.state.role === "EDUCATOR") {
        return (<EducatorPage
          ws={this.state.ws}
          userId={this.state.userId}
          lessonState={this.state.lessonState}
          chatMessages={this.state.chatMessages}
          //activeLearners = {this.state.activeLearners}
          learners={this.state.learners}
          detailsByLearner={this.state.detailsByLearner}
          openHelpRequests={this.state.openHelpRequests}
          sendUpdateHelpRequest={this.sendUpdateHelpRequest}
          sendEducatorCancelsHelpRequest={this.sendEducatorCancelsHelpRequest}
          educatorId={this.state.userId}
          sendEducatorsChatMessage={this.sendEducatorsChatMessage}
          learnersLiveCode={this.state.learnersLiveCode}
          avState={this.state.avState}
          educatorStartCall={this.educatorStartCall}
          cancelCall={this.cancelCall}
          endCall={this.endCall}
          eduCode = {this.state.eduCode} 
          setEduCode = {this.setEduCode}
          consoleStrings={this.state.consoleStrings}
          sendExecutionInput={this.sendExecutionInput}
          sendEduCodeToCompileMessage={this.sendEduCodeToCompileMessage}
          updateEduCodeToCode = {this.updateEduCodeToCode}          
          sendTerminateExecutionRequest={this.sendTerminateExecutionRequest}

        />);
      }
    }
    else {
      return (<LoginPage connect={this.connect.bind(this)} loginError={this.state.loginError} />)
    }
  }
}

export default App;
