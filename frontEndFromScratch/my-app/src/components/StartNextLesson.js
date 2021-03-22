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
                <Image src="/images/educatorLessonPic.jpg" fluid/>
                <h1 className> YOUR NEXT LESSON</h1>
                <p>CD4101 - Intro to Java - Lesson 2/12</p>
                <button onClick={this.handleClick}> 
                    Start Lesson 
                </button>
            </div>
    )}

    handleClick(){
        this.props.ws.send(JSON.stringify({
            id:1, 
            from:this.props.userId, 
            _type:"LessonStartMessage"}
        ))
        console.log("Button Pressed")
}

}

export default StartNextLesson;
