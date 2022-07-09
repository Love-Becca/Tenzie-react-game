import React from "react";
import './tenzie.css'
//component for the the die number section and some props are passed
export default function Die(props){
    return(
        // this conditional statement changes the background color once the isHeld value changes the styles are in css
        <div className={props.isHeld ? "tenzie-dices": "tenzie-dice"}
            onClick={props.holdDice}>
            {props.value}
        </div>
    )
}