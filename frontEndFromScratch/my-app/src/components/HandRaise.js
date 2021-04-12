import Button from 'react-bootstrap/Button';


function HandRaise(props) {

    


    if (props.openHelpRequest)    
        return (
                <Button onClick={lowerHand} className="lower-hand-btn"><i class="fas fa-hand-paper"></i></Button>  
        )
    else {
        return (
                <Button onClick={raiseHand} className="hand-raise-btn"><i class="far fa-hand-paper"></i></Button>
        )        
    }      
    
    function raiseHand(){
        props.sendHelpRequest();
    }

    function lowerHand(){
        props.sendLearnerCancelsHelpRequest();
    }

}

export default HandRaise
