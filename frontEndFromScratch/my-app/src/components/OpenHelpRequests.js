import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';


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
      <List className="open-help-requests" style ={{ width: "100%", maxWidth: "46ch", backgroundColor: "white"}}>                
          {this.props.openHelpRequests.map(helpRequest => {
          
            if(helpRequest.status === "NEW"){
              return (
                  
                  <ListItem alignItems="flex-start" style ={{ height: "100px", backgroundColor: ""}} key={helpRequest.learnerId + helpRequest.timeReceived}> {/*className = "new-help-request"*/}
                     
                      <ListItemAvatar>
                        <Avatar alt={helpRequest.learnerName} src={`/images/${helpRequest.learnerId}.ico`}/>
                      </ListItemAvatar>

                      <ListItemText
                        primary={helpRequest.learnerName}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              display= 'inline'
                              color="textPrimary">
                                  {new Date(helpRequest.timeReceived * 1000).toLocaleTimeString([], {hourCycle: 'h23', hour: '2-digit', minute: '2-digit'})}
                            </Typography>
                            {" — " + helpRequest.status}
                            

                            <ListItemSecondaryAction>
                              <List component="div" disablePadding>
                                
                                <ListItem button>
                                  <ListItemIcon>
                                    <TimelapseIcon/>
                                  </ListItemIcon>
                                  <ListItemText primary="In-Progress"/>
                                </ListItem>
                                <ListItem button>
                                  <ListItemText primary='Mark "Complete" '/>
                                </ListItem>
                              </List>
                              </ListItemSecondaryAction>
                          
                          </React.Fragment>
                        }
                      />                  
                  </ListItem>


                )
            } else if (helpRequest.status === "IN_PROGRESS") {
              return (

                <ListItem alignItems="flex-start" key={helpRequest.learnerId + helpRequest.timeReceived}> {/*className = "new-help-request"*/}
                     
                     <ListItemAvatar>
                       <Avatar alt={helpRequest.learnerName} src={`/images/${helpRequest.learnerId}.ico`}/>
                     </ListItemAvatar>

                     <ListItemText
                       primary={helpRequest.learnerName}
                       secondary={
                         <React.Fragment>
                           <Typography
                             component="span"
                             variant="body2"
                             style = {{display: 'inline'}}
                             color="textPrimary">
                                 {new Date(helpRequest.timeReceived * 1000).toLocaleTimeString([], {hourCycle: 'h23', hour: '2-digit', minute: '2-digit'})}
                           </Typography>
                           {" — " + helpRequest.status}
                         </React.Fragment>
                       }
                     />
   
                     <ListItemSecondaryAction>
                     <Button
                          edge= "end"
                          variant="contained"
                          color="primary"
                          size="small"
                          aria-label="change status to in progress"
                          startIcon={<DeleteForeverIcon/>}>
                          Complete Help Request
                      </Button>
                     </ListItemSecondaryAction>
                
                     <Divider variant="inset" component="li" />

                 </ListItem>

              )
            } else {return <div/>}
          })}
      </List>
    )
  }
}

export default OpenHelpRequests
