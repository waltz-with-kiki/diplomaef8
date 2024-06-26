
import React from "react";
import "./Projectstyles.css";
import MyButton from "./Components/UI/MyButton";

const ExperimentPage = () =>{

    return(
        <div>
            <h1>Эксперимент</h1>
            <div className="template-leftrightmodule">
            <div className="template-leftmodule">
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
    );
}

export default ExperimentPage;