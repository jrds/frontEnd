import React, { Component } from 'react';
import "./Welcome.css"

export default class LessonPlan extends Component {

    render() { 
        return (

        <div>
            <div style ={{marginTop: "120px"}}>
                <h4> Add a new lesson</h4>
                <div style = {{paddingLeft: "20px", paddingTop: "10px"}}><i class="fas fa-plus fa-3x"></i></div>
            </div>
            
            <div style ={{marginTop: "130px", borderRadius: "20px"}}>
                <h4> Edit my lessons</h4>
                <div style = {{paddingLeft: "20px", paddingTop: "10px"}}><i class="far fa-edit fa-3x"></i></div>
            </div>
            </div>
    )}
}