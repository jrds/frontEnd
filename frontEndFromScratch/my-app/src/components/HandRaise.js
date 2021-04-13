import Button from 'react-bootstrap/Button';


function HandRaise(props) {

    


    if (props.openHelpRequest)    
        return (
                <Button onClick={lowerHand} style = {{backgroundColor: "white", color: "#feccc3", borderRadius: "20px", border: "1px solid #e7babd"}}><i class="fas fa-hand-paper fa-3x" style = {{WebkitTextStroke: "1px #fedcd6"}}></i></Button>  
        )
    else {
        return (
                <Button onClick={raiseHand} style = {{backgroundColor: "white", color: "#feccc3", borderRadius: "20px", border: "1px solid #e7babd"}}><i class="far fa-hand-paper fa-3x" style = {{WebkitTextStroke: "1px white"}}></i></Button>
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
