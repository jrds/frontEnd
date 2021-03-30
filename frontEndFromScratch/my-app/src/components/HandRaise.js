
function HandRaise(props) {

    if (props.openHelpRequest)    
        return (
            <div>
                <button onClick={lowerHand} className="lower-hand-btn"><i class="fas fa-hand-paper"></i></button>  
            </div>
        )
    else {
        return (
            <div>
                <button onClick={raiseHand} className="hand-raise-btn"><i class="far fa-hand-paper"></i>Get Help</button>
            </div>
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
