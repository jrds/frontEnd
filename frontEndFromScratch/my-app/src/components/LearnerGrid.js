import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CodeSectionOfLearnerCard from './CodeSectionOfLearnerCard';


export class LearnerGrid extends Component {


    
    render() {
        return(
          <>
            <div>  
                {
                    //this.props.activeLearners.map(learner => {
                    Array.from(this.props.learnersInAttendance, ([learnerId, learnerInfo]) => {
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
                    })
                }
            </div>    
          
            {/* <div>
                {
                    Array.from(this.props.learnersLiveCode, ([learner, code]) => {
                        return(
                            // Make it look like code, and reflect the line spacing etc. //TODO 
                            <>
                                <div key = {learner}>
                                    {learner}
                                </div>
                                <div>
                                <CodeMirror
                                    value= {code}
                                    options={{
                                        mode: 'xml',
                                        theme: 'material',
                                        lineNumbers: true,
                                        readOnly: true
                                    }}
                                    />
                                </div>
                            </>
                        )
                    })
                }
            </div>       */}
          </>
        )
    }
}

export default LearnerGrid
