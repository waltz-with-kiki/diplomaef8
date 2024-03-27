import React, { useEffect, useState } from "react";
import "../../Projectstyles.css";
import SettingsItem from "./SettingsItem";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import CheckboxWithLabel from "./CheckboxWithLabel";
import ButtonWithInput from "./ButtonWithInput";
import SpanWithSelect from "./SpanWithSelect";


const TemplateDetails = ({template, ...props}) => {

    const [acceptedTemplatename, setAcceptedTemplateName] = useState({name: '', qrmi: {}, qrhmi: {}});
    const [templatename, setTemplateName] = useState('');  


    useEffect(() =>{
        if(template !== null){
        setAcceptedTemplateName({name: template.name, qrmi: template.qrmiNavigation, qrhmi: template.qrhmiNavigation})
        }
    }, [template]);

    return(
        <div>

        <div className="template-container">
            <MyInput type="template" className="template-input" value={acceptedTemplatename.name} onChange={(e) => setAcceptedTemplateName({...acceptedTemplatename, [acceptedTemplatename.name]: e.target.value})} required/>
            <label className="template-label">Название шаблона:</label>
            </div>

        <div className="evaluation-module">
                <label>Настройка модулей оценки:</label>
                <ButtonWithInput button={"Экспертная оценка ИМ"} placeholder={"Наименование анкеты"} inputtitle={acceptedTemplatename.qrhmi && acceptedTemplatename.qrhmi.name} className="input-row"></ButtonWithInput>
                <ButtonWithInput button={"Экспертная оценка ЧМИ"} placeholder={"Наименование анкеты"} inputtitle={acceptedTemplatename.qrhmi && acceptedTemplatename.qrhmi.name} className="input-row"></ButtonWithInput>
            </div>

        <div className="setting-module">
                <label>Настройка оборудования и ПО:</label>

                <SettingsItem u={"КММ"} button={"+"}></SettingsItem>

                <div className="template-leftrightmodule">   


            <div className="template-leftmodule">
                <ButtonWithInput button={"..."} placeholder={"Файл БД моделей"} stylebutton={{width: "200px"}} className="input-row-reverse"></ButtonWithInput>
                <SettingsItem u={"Трекер глаз"} button={"Настройка"}></SettingsItem>
                <SettingsItem u={"Резерв внимания"} button={"Настройка"}></SettingsItem>
                <SettingsItem u={"Энцефалограф"} button={"Настройка"}></SettingsItem>
                <SettingsItem u={"Пульсометр"} button={"Настройка"}></SettingsItem>
                <SettingsItem u={"Видеорегистратор"} button={"Настройка"}></SettingsItem>
            </div>


            <div className="template-rightmodule">
            <ButtonWithInput button={"..."} placeholder={"AIVA"} className="input-row-reverse"></ButtonWithInput>

            <SpanWithSelect label={"Выбранный набор моделей:"}></SpanWithSelect>
            <SpanWithSelect label={"Выбранный набор НУ:"}></SpanWithSelect>
                
                <CheckboxWithLabel label={"Сервер записи эксперимента"}></CheckboxWithLabel>
                <CheckboxWithLabel label={"Запись после включения"}></CheckboxWithLabel>
                </div>

                
                </div>

            </div>
            </div>
    );
}

export default TemplateDetails;