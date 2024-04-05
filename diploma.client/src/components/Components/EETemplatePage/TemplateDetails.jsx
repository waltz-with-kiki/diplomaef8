import React, { useEffect, useState } from "react";
import "../../Projectstyles.css";
import SettingsItem from "./SettingsItem";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import CheckboxWithLabel from "./CheckboxWithLabel";
import SpanWithSelect from "./SpanWithSelect";
import MyModal from "../UI/MyModal/MyModal";


const TemplateDetails = ({template, openHmi, openIm, setIsOpenModule, AddNewTemplate, RemoveTemplate, ...props}) => {

    const [acceptedTemplatename, setAcceptedTemplateName] = useState({name: '', qrim: {}, qrhmi: {}});
    const [removeTemplate, setRemoveTemplate] = useState(false);
    const [moduleTemplateToRemove, setModuleTemplateToRemove] = useState(null);


    useEffect(() =>{
        if(template !== null){
        setAcceptedTemplateName({name: template.name, qrim: template.qrimNavigation, qrhmi: template.qrhmiNavigation})
        }
    }, [template]);

    const handleAddTemplate = () =>{
        AddNewTemplate(acceptedTemplatename);
    }

    const handleRemoveTemplate = () =>{
        RemoveTemplate(acceptedTemplatename);
        setRemoveTemplate(false);
        setAcceptedTemplateName({name: '', qrim: null, qrhmi: null})
    }

    const handleChangeHmi = (value) => {
        setAcceptedTemplateName({...acceptedTemplatename, qrhmi: value})
    }
    const handleChangeIm = (value) => {
        setAcceptedTemplateName({...acceptedTemplatename, qrim: value})
    }



    const handleRemoveTemplateClick = (templateName) => {
        setModuleTemplateToRemove(templateName); 
        setRemoveTemplate(true); 
    }


    const handleCancelRemoveTemplate = () => {
        setRemoveTemplate(false);
        setModuleTemplateToRemove(null);
    }

    return(
        <div>


            <div className="template-actions-module">
                <MyButton onClick={handleAddTemplate} className="button1">Сохранить</MyButton>
                <MyButton onClick={e => setIsOpenModule(true)} className="button1">Открыть</MyButton>
                <MyButton onClick={e => handleRemoveTemplateClick(acceptedTemplatename.name)}className="button1">Удалить</MyButton>
            </div>

        <div className="template-container">
            <MyInput type="template" className="template-input" value={acceptedTemplatename.name} onChange={(e) => setAcceptedTemplateName({...acceptedTemplatename, name: e.target.value})} required/>
            <label className="template-label">Название шаблона:</label>
            </div>

        <div className="evaluation-module">
                <label>Настройка модулей оценки:</label>
                <div className="input-row">
            <MyButton onClick={openIm} className="button1">Экспертная оценка ИМ</MyButton>
            <MyInput placeholder={"Наименование анкеты"} style={{width: "100%"}} value={(acceptedTemplatename.qrhmi && acceptedTemplatename.qrhmi.name || '')} onChange={e => handleChangeHmi(e.target.value)} readOnly required></MyInput>
        </div>
        <div className="input-row">
            <MyButton onClick={openHmi} className="button1" >Экспертная оценка ЧМИ</MyButton>
            <MyInput placeholder={"Наименование анкеты"} style={{width: "100%"}} value={(acceptedTemplatename.qrim && acceptedTemplatename.qrim.name) || ''} onChange={e => handleChangeIm(e.target.value)} readOnly required></MyInput>
        </div>
            </div>

        <div className="setting-module">
                <label>Настройка оборудования и ПО:</label>

                <SettingsItem u={"КММ"} button={"+"}></SettingsItem>

                <div className="template-leftrightmodule">


            <div className="template-leftmodule">            
                <div className="input-row-reverse">
            <MyButton className="button1" >...</MyButton>
            <MyInput placeholder={"Файл БД моделей"} style={{width: "100%"}}></MyInput>
             </div>
                
                <SettingsItem u={"Трекер глаз"} button={"Настройка"}></SettingsItem>
                <SettingsItem u={"Резерв внимания"} button={"Настройка"}></SettingsItem>
                <SettingsItem u={"Энцефалограф"} button={"Настройка"}></SettingsItem>
                <SettingsItem u={"Пульсометр"} button={"Настройка"}></SettingsItem>
                <SettingsItem u={"Видеорегистратор"} button={"Настройка"}></SettingsItem>
            </div>


            <div className="template-rightmodule">

            <div className="input-row-reverse">
            <MyButton className="button1" >...</MyButton>
            <MyInput placeholder={"AIVA"} style={{width: "100%"}}></MyInput>
        </div>
            <SpanWithSelect label={"Выбранный набор моделей:"}></SpanWithSelect>
            <SpanWithSelect label={"Выбранный набор НУ:"}></SpanWithSelect>
                
                <CheckboxWithLabel label={"Сервер записи эксперимента"}></CheckboxWithLabel>
                <CheckboxWithLabel label={"Запись после включения"}></CheckboxWithLabel>
                </div>

                
                </div>

            </div>

                <MyModal active={removeTemplate} setActive={setRemoveTemplate}>
                    <h3>Вы точно хотите удалить шаблон {moduleTemplateToRemove}?</h3>
                    <MyButton onClick={handleRemoveTemplate}>ОК</MyButton>
                    <MyButton onClick={handleCancelRemoveTemplate}>Отмена</MyButton>
                </MyModal>

            </div>
    );
}

export default TemplateDetails;