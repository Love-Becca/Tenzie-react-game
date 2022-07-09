import React, { useEffect, useState } from "react";
import './tenzie.css'
import Die from "./die";
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function TenzieComponent(){
//This is a state change in which the function generating the random numbers is passed into it such that upon reload we generate random numbers
    const [diceNumbers, setDiceNumber] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false)
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
    //this function gets the particular div or number that is being click and change the state
    function holdDice(id){
        setDiceNumber(prevDiceNumbers => prevDiceNumbers.map(flip => {
                return flip.id === id ? 
                {...flip, isHeld : !flip.isHeld} : 
                flip//This checks if the id being flipped is the same as the id that was passed if true it should update the  isHeld property object to its opposite if not it should return the parameter passed to the map
            })
        )
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
      // this is an event listener used on the roll button that 
    function rollDice(){
        if (tenzies) { //This condition specifies a new game once tenzies is true
            setTenzies(false)
            setDiceNumber(allNewDice)
        } else {
            setDiceNumber(prevDiceNumbers => prevDiceNumbers.map(die =>{ //generates other random numbers once the button is clicked if the numbers are not yet held
                return die.isHeld ?  die : 
                {value:Math.ceil(Math.random()*6),
                isHeld:false,
                id:nanoid()}
            }))
            
        }

       
    }
 // This effect is used to end the game i.e check if the dice is held and if the each dice value is equals to the first value saved in the array
    useEffect(()=>{
        const checkTenzie = diceNumbers.every(dice=> dice.isHeld)
        const checkForSameValue = diceNumbers.every(dice => dice.value === diceNumbers[0].value)
        checkTenzie && checkForSameValue ? setTenzies(true) : setTenzies(false);
    },[diceNumbers])

    return(
        <div className="tenzie-body">
            {tenzies && <Confetti />}
            <h1 className="tenzie-title">Tenzies</h1>
            <p className="tenzie-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-section">{differentDieNumber}</div>
            <button className={tenzies?"tenzie-buttons":"tenzie-button"} onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
        </div>
    )
}