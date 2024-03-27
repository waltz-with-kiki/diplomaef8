import React from "react";
import "./MyActiveButton.css"

const MyActiveButton = ({children, active, ...props}) =>{

    const buttonClassName = active ? 'preparationpage-my-button active' : 'preparationpage-my-button';

    return(
        <div>
            <button className={buttonClassName} {...props}>{children}</button>
        </div>
    );
}

export default MyActiveButton;