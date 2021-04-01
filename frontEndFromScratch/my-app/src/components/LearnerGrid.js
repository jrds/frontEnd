import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export class LearnerGrid extends Component {


    
    render() {
        return(
            //this.props.activeLearners.map(learner => {
            this.props.dummyLearners.map((learner, idx) => {
                return(
                    <Card key = {idx}>
                        <Card.Body>
                            <Card.Title>{learner.name}</Card.Title>
                        </Card.Body>
                    </Card>    
                )          
            })
        )
    }
}

export default LearnerGrid
