import React, { Component } from 'react';
import AboveThumbnailable from './AboveThumbnailable';
import Thumbnailable from './Thumbnailable';
import BelowThumbNailable from './BelowThumbNailable';


export class ZoomInOnLearner extends Component {
    
    
    render() {
   
        return (
            <div>
                <AboveThumbnailable learnerObj = {this.props.learnerObj}/>
                <Thumbnailable learnerCode = {this.props.learnerObj.code}/>    
                <BelowThumbNailable 
                    learnerObj = {this.props.learnerObj} 
                    learnerCode = {this.props.learnerObj.code} 
                />  {/* could end up being left and right //TODO
                    think about instructor to see execution of learners code. would mean having the console strings from the latest execution on the learner obj*/}
                </div>
        )
    }
}

export default ZoomInOnLearner
