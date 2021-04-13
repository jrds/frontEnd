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
import FiberNewIcon from '@material-ui/icons/FiberNew';
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

  selectUser(learnerId) {
    this.props.updateUserToHelp(learnerId)
    console.log()
  }

  render() {
    return (
      <List className="open-help-requests" style={{ width: "100%", maxWidth: "46ch", backgroundColor: "white" }}>
        {this.props.openHelpRequests.map(helpRequest => {

          if (helpRequest.status === "NEW") {
            return (

              <ListItem style={{ height: "100px", backgroundColor: "", borderBottom: "1px solid #dcdcdc" }} key={helpRequest.learnerId + helpRequest.timeReceived}> {/*className = "new-help-request"*/}

                <ListItemAvatar button onClick={() => this.selectUser(helpRequest.learnerId)}>
                  <Avatar alt={helpRequest.learnerName} src={`/images/${helpRequest.learnerId}.ico`} />
                </ListItemAvatar>

                <ListItemText
                  primary={helpRequest.learnerName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        display='inline'
                        color="textPrimary">
                        {new Date(helpRequest.timeReceived * 1000).toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                      {" — "}
                      <FiberNewIcon fontSize="large" style={{ color: "#e57373" }} />


                      <ListItemSecondaryAction>
                        <List component="div" disablePadding>

                          <ListItem button onClick={() => this.changeStatusToInProgress(helpRequest.learnerId)}>
                            <ListItemText primary="Mark as: In-Progress" />
                          </ListItem>
                          <ListItem button onClick={() => this.changeStatusToCompleted(helpRequest.learnerId)}>
                            <ListItemText primary="Mark as: Complete" />
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

              <ListItem style={{ height: "100px", backgroundColor: "", borderBottom: "1px solid #dcdcdc" }} key={helpRequest.learnerId + helpRequest.timeReceived}> {/*className = "new-help-request"*/}

                <ListItemAvatar button onClick={() => this.selectUser(helpRequest.learnerId)}>
                  <Avatar alt={helpRequest.learnerName} src={`/images/${helpRequest.learnerId}.ico`} />
                </ListItemAvatar>

                <ListItemText
                  primary={helpRequest.learnerName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ display: 'inline' }}
                        color="textPrimary">
                        {new Date(helpRequest.timeReceived * 1000).toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                      {" — In-Progress"}
                      
                    </React.Fragment>
                  }
                />

                <ListItemSecondaryAction>
                <List component="div" disablePadding>
                  <ListItem button onClick={() => this.changeStatusToCompleted(helpRequest.learnerId)}>
                    <ListItemIcon>
                      <DeleteForeverIcon/>
                    </ListItemIcon>
                  </ListItem>
                </List>
                </ListItemSecondaryAction>

              </ListItem>

            )
          } else { return <div /> }
        })}
      </List>
    )
  }
}

export default OpenHelpRequests
