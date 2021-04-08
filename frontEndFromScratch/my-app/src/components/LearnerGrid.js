import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'
import CodeSectionOfLearnerCard from './CodeSectionOfLearnerCard';


export class LearnerGrid extends Component {


    
    render() {
        return(
          <>
            <CardColumns>  
                {
                    this.props.learners.map(l => {
                        var details = this.props.detailsByLearner.get(l.id);

                        var body;
                        
                        if (l.attending)
                        {
                            body =  <Card.Body>
                                        <div>
                                            <CodeSectionOfLearnerCard name = {details.name} code = {details.code}/> 
                                        </div>
                                    </Card.Body>
                        }
                        else
                        {
                            body = <Card.Body>Has not yet joined the lesson</Card.Body>
                        }
                        
                        return(
                            // Will eventually become LearnerCard - to handle all the info on learner.
                            <Card className = {l.attending ? "attending" : "absent"} bg = {l.attending ? "warning" : "dark"} key = {details.id}> 
                                <Card.Header>{details.name}</Card.Header>
                                {body}
                            </Card>    
                        )          
                    })

                    /* Array.from(this.props.learnersInAttendance, ([learnerId, learnerInfo]) => {
                        return(

                            // Will eventually become LearnerCard - to handle all the info on learner.
                            <Card key = {learnerId}> 
                                <Card.Body>
                                    <Card.Title>{learnerInfo.name}</Card.Title>
                                    <div>
                                        <CodeSectionOfLearnerCard name = {learnerInfo.name} code = {learnerInfo.code}/> 
                                    </div>
                                </Card.Body>
                            </Card>    
                        )          
                    }) */
                }
            </CardColumns>    
          </>
        )
    }
}

export default LearnerGrid
