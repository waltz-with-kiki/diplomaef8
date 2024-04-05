import React, { useState, useEffect } from "react";
import "./Projectstyles.css";
import MyButton from "./Components/UI/MyButton";
import MyInput from "./Components/UI/MyInput";
import MyModal from "./Components/UI/MyModal/MyModal";
import ExaminationTemplateItem from "./Components/EETemplatePage/ExaminationTemplateItem";
import TemplateDetails from "./Components/EETemplatePage/TemplateDetails";

const EETemplate = () => {

    const [examinationTemplates, setExaminationTemplates] = useState([]);
    const [isOpenModule, setIsOpenModule] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [acceptSelectedTemplate, setAcceptSelectedTemplate] = useState(null);
    const [hmiExpertAssessment, setHmiExpertAssessment] = useState(false);
    const [imExpertAssessment, setimExpertAssessment] = useState(false);


    

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
            console.error("Error fetching templates:", error);
        }

    }

    const handleAcceptSelectedTemplate = (template) =>{
        setAcceptSelectedTemplate(template);
        console.log(template);
        setIsOpenModule(false);
    }

    const checkhandleAddNewTemplate =(newTemplate) =>{
        const a = examinationTemplates.find(e => e.name === newTemplate.name);

        
        if (a != null){
            console.error("Такой template уже существует");
        }
        else{           
        handleAddNewTemplate(newTemplate);
        console.log(newTemplate);
        console.log(newTemplate.descr);
        console.log(newTemplate.qrim.name);
        console.log(newTemplate.qrhmi.name);
        
        }
    }

    const handleAddNewTemplate = async (newTemplateAcc) =>{
        try {
            const response = await fetch('https://localhost:7006/api/examinationtemplates/addnewtemplate', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    Name: newTemplateAcc.name,
                 //   Descr: newTemplateAcc.descr !== "" ? newTemplateAcc.descr : '',
                    NameIm: newTemplateAcc.qrim.name,
                    NameHmi: newTemplateAcc.qrhmi.name
                  }),
            })
        } catch (error) {
          console.error("Error fetching:", error)  
        }
        fetchExaminationTemplates();
    }

    const checkhandleRemoveTemplate = (template) =>{

        const a = examinationTemplates.find(e => e.name === template.name);

        
        if (a == null){
            console.error("Такого template уже и нет");
        }
        else{
            handleRemoveTemplate(template);
        }

    }

    const handleRemoveTemplate = async (removetemplate) =>{
        try {
            const response = await fetch('https://localhost:7006/api/examinationtemplates/removenewtemplate', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    Name: removetemplate.name,
                  }),
            })
        } catch (error) {
          console.error("Error fetching:", error)  ;
        }

        fetchExaminationTemplates();
    }


    
    return(
        <div>
            <h2>Шаблон ЭЭ</h2>
            
            <TemplateDetails RemoveTemplate={checkhandleRemoveTemplate} AddNewTemplate={checkhandleAddNewTemplate} setIsOpenModule={setIsOpenModule} openIm={e => setimExpertAssessment(true)} openHmi={e => setHmiExpertAssessment(true)} template={acceptSelectedTemplate}></TemplateDetails>

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
            </MyModal >


            <MyModal active={hmiExpertAssessment} setActive={setHmiExpertAssessment} width={"70%"} height={"95%"}>
                            <h1>Проверка Hmi</h1>
            </MyModal>

            <MyModal active={imExpertAssessment} setActive={setimExpertAssessment} width={"70%"} height={"95%"}>
                            <h1>Проверка Im</h1>
            </MyModal>
            
          
        </div>
    );
}

export default EETemplate;

