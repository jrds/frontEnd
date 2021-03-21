import './App.css';
import React, { Component } from 'react';
import LoginPage from './components/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LessonPage from './components/LessonPage';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ws: null,
      loggedIn: false,
      loginError: "",
      userId: "",
      lessonId: ""
    };
  }

  // single websocket instance for the own application and constantly trying to reconnect.

  // componentDidMount() {
  //   this.connect();
  // }

  timeout = 250; // Initial timeout duration as a class variable

  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
   */
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
        ws.send(JSON.stringify({id:0, from:this.state.userId, _type:"sessionStart"}));
      }
      console.log("connected websocket main component");

      this.setState({ ws: ws });

      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onmessage = e => {
      console.log(e.data);
      var msg = JSON.parse(e.data);
      if (msg.id === 0 && msg._type === "success")
      {
        console.log("Login: success response received")
        this.setState({loginError:"", loggedIn:true})
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
        // Maybe add reconnect logic here
      }
      else
      {        
        console.log("Loggin failed.");
        this.setState({loginError: "Login failed."})
      }
      // console.log(
      //   `Socket is closed. Reconnect will be attempted in ${Math.min(
      //     10000 / 1000,
      //     (that.timeout + that.timeout) / 1000
      //   )} second.`,
      //   e.reason
      // );

      // that.timeout = that.timeout + that.timeout; //increment retry interval
      // //connectInterval = setTimeout(this.check, Math.min(120000, that.timeout)); //call check function after timeout
    };

    // // websocket onerror event listener
    // ws.onerror = err => {
    //   console.error(
    //     "Socket encountered error: ",
    //     err.message,
    //     "Closing socket"
    //   );

    //   ws.close();
    // };
  };

  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
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
      return (<LessonPage/>)
    }
    else
    {
      return (<LoginPage connect={this.connect.bind(this)} loginError={this.state.loginError}/>)
    }
  }
}

export default App;
