import React, { useState } from "react";
import Project from "./Project";
import Experts from "./Experts";
import EETemplate from "./EE template";
import MyButton from "./Components/UI/MyButton";
import "./Projectstyles.css"
import MyActiveButton from "./Components/UI/MyActiveButton/MyActiveButton";

const PreparationPage = () =>{

    const [selectedComponent, setSelectedComponent] = useState('project');

    const selectproject = () =>{
        setSelectedComponent('project');
    }
    const selectexperts = () =>{
        setSelectedComponent('experts');
    }
    const selecteetemplate = () =>{
        setSelectedComponent('eetemplate');
    }

    const ComponentDisplay = () =>{
        switch (selectedComponent) {
            case 'project':
               return <Project></Project>
                break;
            case 'experts':
               return <Experts></Experts>
                break;
            case 'eetemplate':
               return <EETemplate></EETemplate>
                break;
        
            default:
                break;
        }
    }

    return(
        <div>
        <div className="button-container">
            <h1 style={{float: "left"}}>Подготовка</h1>
            <div className="preparationpage-buttons-container">
            <MyActiveButton onClick={selectproject} active={selectedComponent === 'project'}>Projects</MyActiveButton>
            <MyActiveButton onClick={selectexperts} active={selectedComponent === 'experts'}>Experts</MyActiveButton>
            <MyActiveButton onClick={selecteetemplate} active={selectedComponent === 'eetemplate'}>EETemplate</MyActiveButton>
            </div>
        </div>

            {ComponentDisplay()}
        </div>
    );
}

export default PreparationPage;