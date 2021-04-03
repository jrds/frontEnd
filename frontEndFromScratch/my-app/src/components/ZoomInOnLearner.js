import React, { Component } from 'react'

export class ZoomInOnLearner extends Component {
    render() {
        return (
            <div>
                <AboveThumbnailable/>
                <Thumbnailable/>    
                <BelowThumbNailable/>  {/* could end up being left and right*/}
            </div>
        )
    }
}

export default ZoomInOnLearner
