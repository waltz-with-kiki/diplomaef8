import React from "react";
import "../../Projectstyles.css"
import MyButton from "../UI/MyButton";


const ActionsForm = ({setIsOpenModule}) => {

    return(
        <div>
            <div className="template-actions-module">
                <MyButton className="button1">Создать</MyButton>
                <MyButton onClick={e => setIsOpenModule(true)} className="button1">Открыть</MyButton>
                <MyButton className="button1">Создать копию</MyButton>
                <MyButton className="button1">Удалить</MyButton>
            </div>
        </div>
    );
}

export default ActionsForm