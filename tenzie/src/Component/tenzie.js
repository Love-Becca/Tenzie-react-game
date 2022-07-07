import React, { useState } from "react";
import './tenzie.css'
import Die from "./die";


export default function TenzieComponent(){
    function allNewDice(){
        const tenRandomNumbers = []
        for (let i = 0; i < 10; i++) {
            tenRandomNumbers.push(Math.ceil(Math.random()*6))
        }
        return tenRandomNumbers
    }

    const [diceNumbers, setDiceNumber] = useState(allNewDice());
    const differentDieNumber = diceNumbers.map(die => <Die value ={die}/>)
    return(
        <div className="tenzie-body">
            <h1 className="tenzie-title">Tenzies</h1>
            <p className="tenzie-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-section">{differentDieNumber}</div>
            <button className="tenzie-button">Roll</button>
        </div>
    )
}