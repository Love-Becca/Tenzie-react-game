import React, { useState } from "react";
import './tenzie.css'
import Die from "./die";
import {nanoid} from 'nanoid'

export default function TenzieComponent(){
//This is a state change in which the function generating the random numbers is passed into it such that upon reload we generate random numbers
    const [diceNumbers, setDiceNumber] = useState(allNewDice());
//This function randomly generates the numbers ten times and the push an object into the array, the object contains the random number, Id  and isHeld to know if the number has be taken
    function allNewDice(){
        const tenRandomNumbers = []
        for (let i = 0; i < 10; i++) {
            tenRandomNumbers.push({
                value:Math.ceil(Math.random()*6),// ceil was used to round it up
                isHeld:false,
                id:nanoid() // nanoid are random id generator and it is a dependency installed through npm
            })
        }
        return tenRandomNumbers
    }
    //this function gets the particular div or number that is being click
    function holdDice(id){
        setDiceNumber((prevDiceNumbers)=>{
            prevDiceNumbers.map(flip=>({
            }))
        })
    }
    // we map over each object in the array and return a component in which props are passed such as value to be displayed,each id of each box and the isHeld function 
    const differentDieNumber = diceNumbers.map(die => 
        <Die 
        value ={die.value}
        key ={die.id}
        isHeld = {die.isHeld}
        holdDice = {()=>holdDice(die.id)}// this generate a unique Id 
        />
    )
      // this is an event listener used on the roll button that generate random numbers once the button is clicked
    function rollDice(){
        setDiceNumber(allNewDice)
    }

    return(
        <div className="tenzie-body">
            <h1 className="tenzie-title">Tenzies</h1>
            <p className="tenzie-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-section">{differentDieNumber}</div>
            <button className="tenzie-button" onClick={rollDice}>Roll</button>
        </div>
    )
}