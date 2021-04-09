import React, { Component } from 'react';
import AboveThumbnailable from './AboveThumbnailable';
import Thumbnailable from './Thumbnailable';
import BelowThumbNailable from './BelowThumbNailable';
import Button from 'react-bootstrap/Button';


export class ZoomInOnLearner extends Component {
    
    
    render() {
   
        return (
            <div>
                <Button size="sm" variant="outline-info" onClick = {this.props.deSelectUser}>Back</Button>
                <AboveThumbnailable learnerObj = {this.props.learnerObj}/>
                <Thumbnailable learnerObj = {this.props.learnerObj}/>    
                <BelowThumbNailable 
                    learnerObj = {this.props.learnerObj}  
                />  {/* could end up being left and right //TODO
                    think about instructor to see execution of learners code. would mean having the console strings from the latest execution on the learner obj*/}
                </div>
        )
    }
}

export default ZoomInOnLearner
