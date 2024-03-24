import React, { useState, useRef } from "react";

const AircraftTypeItem = ({aircraft, isSelected, onToggle}) =>{

    const [isSelect, setIsSelect] = useState(false);
    //const inputRef = useRef(null);

    /*const handleUpdateAircraftTypes = () => {
        UpdateAircraftTypes(aircraft.name, !isSelected);
    }*/

    const handleUpdateAircraftTypes = () => {
       // const change = !isSelect;
        //setIsSelect(change)
        onToggle(aircraft.name, !isSelected);
    };

    return(
        <tr>
            <td><input type="checkbox" checked={isSelected}  onChange={handleUpdateAircraftTypes}></input></td>
            <td>{aircraft.name}</td>
        </tr>
    );
}

export default AircraftTypeItem;