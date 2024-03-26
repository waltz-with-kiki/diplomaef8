import React from "react";
import "./Projectstyles.css";
import MyButton from "./Components/UI/MyButton";
import MyInput from "./Components/UI/MyInput";

const EETemplate = () => {


    
    return(
        <div>
            <h1>Шаблон ЭЭ</h1>
            <div className="template-container">
            <MyInput type="template" class="template-input" required/>
            <label class="template-label">Название шаблона:</label>
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


            </div>

        </div>
    );
}

export default EETemplate;

