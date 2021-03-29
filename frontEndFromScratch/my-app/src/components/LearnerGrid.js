import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export class LearnerGrid extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          dummyLearners: [{name: "Jordan", age:29}, {name: "BanBan", age:21}, {name: "Jack", age:29}]
        }
    }
    render() {
        return(
            //this.props.activeLearners.map(learner => {
            this.state.dummyLearners.map(learner => {
                return(
                    <Card>
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
