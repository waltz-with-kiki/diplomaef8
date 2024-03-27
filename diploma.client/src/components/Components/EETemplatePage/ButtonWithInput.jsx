import React from "react";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import "../../Projectstyles.css"

const ButtonWithInput = ({...props}) => {

    return(
        <div className={props.className}>
            <MyButton className="button1" style={props.buttonstyle}>{props.button}</MyButton>
            <MyInput placeholder={props.placeholder} style={{width: "100%"}} value={props.inputtitle !== null ? props.inputtitle : ''}></MyInput>
        </div>
    );
}

export default ButtonWithInput;