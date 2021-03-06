import React, { Component } from 'react';

export class Instruction extends Component {


    render() {
                
        return (
            <div className="Instruction" >
              <h4> {this.props.instruction.title} </h4>
                {this.props.instruction.body.split("\n").map((lne, idx) => {
                    return (<div key={idx}>{lne}</div>)
                })}
            </div>
        )
    }
}

export default Instruction

