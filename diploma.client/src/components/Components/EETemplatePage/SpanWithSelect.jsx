import React from "react";

const SpanWithSelect = ({...props}) => {
    return(
        <div className="template-row">
                                    <span>{props.label}</span>
                                    <select></select>
                     </div>
    );
}

export default SpanWithSelect;