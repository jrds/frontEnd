import React, { Component } from 'react';
import "./Welcome.css"

export default class Welcome extends Component {

    render() { 
        return (
            <div>
                <video src = "/videos/4now.mp4" autoPlay loop muted/>
                <h1 className> WELCOME TO CODI</h1>
                <p>Your streamlined learning environment</p>
            </div>
    )}
}