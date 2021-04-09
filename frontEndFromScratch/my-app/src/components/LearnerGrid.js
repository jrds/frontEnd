import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'
import CodeSectionOfLearnerCard from './CodeSectionOfLearnerCard';
import Button from 'react-bootstrap/Button';

export class LearnerGrid extends Component {

    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    
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
                                                                                
                                        <Button variant = "outline-info" value = {details.id} onClick={this.handleClick}>Zoom in</Button>
                                        
                                    </Card.Body>
                        }
                        else
                        {
                            body = <Card.Body>Hasn't joined the lesson yet</Card.Body>
                        }
                        
                        return(
                            // Will eventually become LearnerCard - to handle all the info on learner.
                            <Card className = {l.attending ? "attending" : "absent"} bg = {l.attending ? "light" : "secondary"} border= {l.attending ? "info" : "null"} key = {details.id}> 
                                <Card.Header>{details.name}</Card.Header>
                                {body}
                            </Card>    
                        )          
                    })
                }
            </CardColumns>    
          </>
        )
    }

    handleClick(e){
        console.log("User: " + e.target.value +" selected");
        this.props.selectUser(e.target.value);
    }


}

export default LearnerGrid
