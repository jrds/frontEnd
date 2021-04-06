import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import './Button.css';

class StartNextLesson extends Component {

    constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    }

    render() { 
        return (
            <div>
                <Image className = "start-next-lesson-img" src="/images/educatorLessonPic.jpg"/>
                <h1> YOUR NEXT LESSON</h1>
                <p>CD4101 - Intro to Java - Lesson 2/12</p>
                <button onClick={this.handleClick}> 
                    Start Lesson 
                </button>
            </div>
    )}

    //TODO - move to App
    handleClick(){
        this.props.ws.send(JSON.stringify({
            id:1, 
            from:this.props.userId, 
            _type:"LessonStartRequest"}
        ))
        console.log("Button Pressed")
}

}

export default StartNextLesson;
