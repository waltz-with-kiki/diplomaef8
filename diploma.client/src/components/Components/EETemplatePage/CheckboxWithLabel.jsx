import React from "react";
import "../../Projectstyles.css"

const CheckboxWithLabel = ({...props}) => {

    return(
    <div className="template-row">
        <input type="checkbox" ></input>
        <span>{props.label}</span>
    </div>
    )
}

export default CheckboxWithLabel;