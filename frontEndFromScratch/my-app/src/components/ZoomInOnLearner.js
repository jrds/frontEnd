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
                />  // could end up being left and right
                </div>
        )
    }
}

export default ZoomInOnLearner
