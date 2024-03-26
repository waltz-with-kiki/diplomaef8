import React from "react";
import Project from "./Project";
import Experts from "./Experts";
import EETemplate from "./EE template";

const PreparationPage = () =>{

    return(
        <div>
            <h1 style={{float: "left"}}>Подготовка</h1>
            <Project></Project>
            <Experts></Experts>
            <EETemplate></EETemplate>

            
        </div>
    );
}

export default PreparationPage;