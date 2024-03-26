import React, { useState, useEffect } from "react";
import "./Projectstyles.css";
import MyButton from "./Components/UI/MyButton";
import MyInput from "./Components/UI/MyInput";
import MyModal from "./Components/UI/MyModal/MyModal";
import ExaminationTemplateItem from "./Components/EETemplatePage/ExaminationTemplateItem";

const EETemplate = () => {

    const [templatename, setTemplateName] = useState(''); 
    const [ExaminationTemplates, setExaminationTemplates] = useState([]);
    const [IsOpenModule, setIsOpenModule] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    

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

    //#region ActionsForm


    //#endregion

    
    return(
        <div>
            <h2>Шаблон ЭЭ</h2>
            <div className="template-container">
            <MyInput type="template" class="template-input" value={templatename} onChange={e => setTemplateName(e.target.value)} required/>
            <label class="template-label">Название шаблона:</label>
            </div>

            <div className="template-actions-module">
                <MyButton className="button1">Создать</MyButton>
                <MyButton onClick={e => setIsOpenModule(true)} className="button1">Открыть</MyButton>
                <MyButton className="button1">Создать копию</MyButton>
                <MyButton className="button1">Удалить</MyButton>
            </div>

            <div className="evaluation-module">
                <label>Настройка модулей оценки:</label>
                <div className="input-row">
                <MyButton className="button1" style={{width: "200px"}}>Экспертная оценка ИМ</MyButton>
                <MyInput placeholder={"Наименование анкеты"} style={{width: "100%"}}></MyInput>
                </div>
                <div class="input-row">
                <MyButton className="button1" style={{width: "200px"}}>Экспертная оценка ЧМИ</MyButton>
                <MyInput placeholder={"Наименование анкеты"} style={{width: "100%"}}></MyInput>
                </div>
            </div>

            <div className="setting-module">
                <label>Настройка оборудования и ПО:</label>

                <div className="template-row">
                    <div className="inline-elements">
                        <input type="checkbox"></input>
                        <u>КММ</u>
                        <MyButton>+</MyButton>
                
                    </div>
                </div>

                <div className="template-leftrightmodule">   
            <div className="template-leftmodule">
            <div className="template-row">
                    <MyInput placeholder={"Файл БД моделей"}></MyInput>
                        <MyButton className="button1">...</MyButton>
                    </div>
                <div className="template-row">
                    <input type="checkbox"></input>
                    <u>Трекер глаз</u>
                    <MyButton className="button1">Настройка</MyButton>
                </div>
                <div className="template-row">
                    <input type="checkbox"></input>
                    <u>Резерв внимания</u>
                    <MyButton className="button1">Настройка</MyButton>
                </div>
                <div className="template-row">
                    <input type="checkbox"></input>
                    <u>Энцефалограф</u>
                    <MyButton className="button1">Настройка</MyButton>
                </div>
                <div className="template-row">
                    <input type="checkbox"></input>
                    <u>Пульсометр</u>
                    <MyButton className="button1">Настройка</MyButton>
                </div>
                <div className="template-row">
                    <input type="checkbox"></input>
                    <u>Видеорегистратор</u>
                    <MyButton className="button1">Настройка</MyButton>
                </div>
                </div>


            <div className="template-rightmodule">
                <div className="template-row">
                <MyInput placeholder={"AIVA"}></MyInput>
                        <MyButton className="button1">...</MyButton>
                </div>
            <div className="template-row">
                            <span>Выбранный набор моделей:</span>
                            <select></select>
                    </div>
                <div className="template-row">
                    <span >Выбранный набор НУ:</span>
                    <select></select>
                </div>
                <div className="template-row">
                    <input type="checkbox"></input>
                    <span>Сервер записи эксперимента</span>
                </div>
                <div className="template-row">
                    <input type="checkbox" ></input>
                    <span>Запись после включения</span>
                </div>
                </div>

                
                </div>

                <div>
                    <MyButton onClick={e => console.log(selectedTemplate)}>Check</MyButton>
                </div>


            </div>

            <MyModal active={IsOpenModule} setActive={setIsOpenModule}>
                <table>
                    <thead>
                        <tr>
                            <th>Название шаблона ЭЭ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ExaminationTemplates.map((template) => 
                        <ExaminationTemplateItem
                        item = {template.name}
                        onSelect={setSelectedTemplate}
                        />)}
                    </tbody>
                </table>
                <div>
                <MyButton>ОК</MyButton>
                <MyButton>Отмена</MyButton>
                </div>
            </MyModal>
            
            
        </div>
    );
}

export default EETemplate;

