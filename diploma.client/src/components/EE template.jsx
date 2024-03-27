import React, { useState, useEffect } from "react";
import "./Projectstyles.css";
import MyButton from "./Components/UI/MyButton";
import MyInput from "./Components/UI/MyInput";
import MyModal from "./Components/UI/MyModal/MyModal";
import ExaminationTemplateItem from "./Components/EETemplatePage/ExaminationTemplateItem";
import ActionsForm from "./Components/EETemplatePage/ActionsForm";
import TemplateDetails from "./Components/EETemplatePage/TemplateDetails";

const EETemplate = () => {

    const [examinationTemplates, setExaminationTemplates] = useState([]);
    const [isOpenModule, setIsOpenModule] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [acceptSelectedTemplate, setAcceptSelectedTemplate] = useState(null)

    

    useEffect(() =>{
        fetchExaminationTemplates();
    }, [])


    const fetchExaminationTemplates =  async() =>{
        try {
            const response = await fetch('https://localhost:7006/api/examinationtemplates/templates');
            const data = await response.json();
            setExaminationTemplates(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }

    }

    const handleAcceptSelectedTemplate = (template) =>{
        setAcceptSelectedTemplate(template);
        console.log(template);
        setIsOpenModule(false);
    }


    
    return(
        <div>
            <h2>Шаблон ЭЭ</h2>
            
            <ActionsForm setIsOpenModule={setIsOpenModule}></ActionsForm>

            <TemplateDetails template={acceptSelectedTemplate}></TemplateDetails>

            <MyModal active={isOpenModule} setActive={setIsOpenModule}>
                <table>
                    <thead>
                        <tr>
                            <th>Название шаблона ЭЭ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examinationTemplates.map((template) => 
                        <ExaminationTemplateItem
                        key={template.id}
                        item = {template}
                        onSelect={setSelectedTemplate}
                        />)}
                    </tbody>
                </table>
                <div>
                <MyButton onClick={e => handleAcceptSelectedTemplate(selectedTemplate)}>ОК</MyButton>
                </div>
            </MyModal>
            
            
        </div>
    );
}

export default EETemplate;

