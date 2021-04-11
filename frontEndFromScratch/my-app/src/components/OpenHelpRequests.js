import React from 'react';
import Button from 'react-bootstrap/Button';
//import DropdownButton from 'react-bootstrap/DropdownButton';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import { Dropdown } from 'react-bootstrap';


class OpenHelpRequests extends React.Component {

    
  changeStatusToInProgress(learnerId) {
    this.props.sendUpdateHelpRequest(learnerId, "IN_PROGRESS")
    console.log("Status changed to in progress");
  }

  changeStatusToCompleted(learnerId) {
    this.props.sendEducatorCancelsHelpRequest(learnerId, "COMPLETED")
    console.log("Status changed to in progress");
  }

  render() {
    return (
        <ul className="open-help-requests">                 
          {this.props.openHelpRequests.map(helpRequest => {
          
            if(helpRequest.status === "NEW"){
              return (
                  <li className = "new-help-request" key={helpRequest.learnerId + helpRequest.timeReceived}>
                    <div className = "help-request-learnerId">
                      {helpRequest.learnerId}
                    </div>
                    <div className = "help-request-info">
                      {new Date(helpRequest.timeReceived * 1000).toLocaleTimeString([], {hourCycle: 'h23', hour: '2-digit', minute: '2-digit'})}
                      {helpRequest.status}
                    </div>
                    <Button type="button" variant="outline-warning" onClick={() => this.changeStatusToInProgress(helpRequest.learnerId)}>Mark as IN PROGRESS</Button>
                    <Button type="button" variant="outline-danger" onClick={() => this.changeStatusToCompleted(helpRequest.learnerId)}>Mark as COMPLETED</Button>
                    {/*       TODO        <>
                      <DropdownButton as={ButtonGroup} title= "Change Status"  variant="info">
                            <Dropdown.Item eventKey="1">Mark as IN PROGRESS</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="2">Mark as COMPLETED</Dropdown.Item>
                      </DropdownButton>                          
                    </>  */}
                  </li>
                )
            }
            else if (helpRequest.status === "IN_PROGRESS") {
              return (
                  <li className = "in-progress-help-request" key={helpRequest.learnerId}>
                    <div className = "help-request-learnerId">
                      {helpRequest.learnerId}
                    </div>
                    <div className = "help-request-info">
                      {helpRequest.timeReceived}
                      {helpRequest.status}
                    </div>
                      <Button type="button" variant="outline-danger" onClick={() => this.changeStatusToCompleted(helpRequest.learnerId)}>Mark as COMPLETED</Button>
                  </li>
                )               
            } else {return <div/>}
            })}
          </ul>
      )
 
    }
}

export default OpenHelpRequests
