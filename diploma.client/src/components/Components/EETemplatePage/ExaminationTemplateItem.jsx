import React from "react";

const ExaminationTemplateItem = ({item, onSelect}) => {

    return(
        <div>
            <tr onClick={e => onSelect(item)}>
            <td>{item}</td>
            </tr>
        </div>
    );
}

export default ExaminationTemplateItem;