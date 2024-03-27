import React from "react";
import MyButton from "../UI/MyButton";
import "../../Projectstyles.css"

const SettingsItem = ({...props}) => {

    return(
        <div className="template-row">
            <input type="checkbox"></input>
            <u>{props.u}</u>
            <MyButton className="button1">{props.button}</MyButton>
        </div>
    )
}

export default SettingsItem;