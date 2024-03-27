import React from "react";

const ExaminationTemplateItem = ({item, onSelect}) => {

    return(
            <tr onClick={e => onSelect(item)}>
            <td>{item.name}</td>
            </tr>
    );
}

export default ExaminationTemplateItem;