import React from "react";
import './tenzie.css'

export default function Die(props){
    return(
        <div className="tenzie-dice">
            {props.value}
        </div>
    )
}