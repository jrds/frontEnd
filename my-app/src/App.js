import React from 'react';
import './App.css';
import { Component } from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ws: null
    };
  }

  // single websocket instance for the own application and constantly trying to reconnect.

  componentDidMount() {
    this.connect();
  }

  timeout = 250; // Initial timeout duration as a class variable

  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
   */
  connect = () => {
    //var ws = new WebSocket("ws://localhost:3000/ws");
    console.log("connecting to websocket");
    var ws = new WebSocket('ws://u1900:pw@localhost:8080/lesson/2905');
    // var ws = new WebSocket('ws://localhost:8080/lesson/2905', {
    //   perMessageDeflate: false,
    //   headers: {
    //     Authorization: "Basic "+btoa("u1900:pw")
    //   },
    // });
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");

      this.setState({ ws: ws });

      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );

      that.timeout = that.timeout + that.timeout; //increment retry interval
      //connectInterval = setTimeout(this.check, Math.min(120000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };
  };

  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  render() {
    return ( 
      <>
      <Router>
        <Navbar />
          <Switch>
            <Route path='/' exact/>
          </Switch>
      </Router>
    </>
    );
  }
}

export default App;
