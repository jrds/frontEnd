import React from 'react'
import {Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function BelowThumbNailable(props){

    
    return (
        <Container>
            <Row className = "code-button-row">
                <Button className = "run-code-button" variant="outline-success" /*onClick = {handleClick()}*/><i class="fas fa-play"></i>
                    Run Code
                </Button>
                <Button className = "stop-code-button" variant="outline-danger" /*onClick = {handleClick2}*/><i class="fas fa-stop"></i>
                    Stop Code Execution
                </Button>
            </Row>
            {/* <Row>
                <CodeConsole consoleStrings={this.props.consoleStrings} sendExecutionInput={this.props.sendExecutionInput} />
            </Row>  */}
            <Row>
                
            </Row>
        </Container>
    )
    


}

export default BelowThumbNailable
