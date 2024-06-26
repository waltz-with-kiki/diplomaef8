import React, { useState, useEffect, useMemo } from "react"
import MyButton from "./Components/UI/MyButton";
import MyInput from "./Components/UI/MyInput";
import ExpertsList from "./Components/ExpertsPage/ExpertsList";
import ExpertDetails from "./Components/ExpertsPage/ExpertDetails";
import "./Projectstyles.css";
import MyModal from "./Components/UI/MyModal/MyModal";
import AddForm from "./Components/ExpertsPage/AddForm";

const Experts = () => {

    const [Experts, setExperts] = useState([]);
    const [AircraftTypes, setAircraftTypes] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [searchExpert, setSearchExpert] = useState("");
    const [addModule, setAddModule] = useState(false);
    const [changeForm, setchangeForm] = useState(false);

    useEffect (() =>{

        fetchAircraftTypes();
        fetchExperts();
    }, []);

    const fetchExperts = async () =>{
        try{
            const response = await fetch('https://localhost:7006/api/project/experts')
        const data = await response.json();
        setExperts(data);
        console.log(data);
        }
        catch(error){
            console.error("Error fetching experts:", error);
        }
    }

    const fetchAircraftTypes = async () => {
        try{
        const response = await fetch('https://localhost:7006/api/project/aircrafttypes');
        const data = await response.json();
        setAircraftTypes(data);
        console.log(data);
        }
        catch(error){
            console.error("Error fetching experts:", error)
        }
    }

    const SearchedExperts = useMemo(() =>{
        if(searchExpert){
        return [...Experts].filter(expert => expert.name.toLowerCase().includes(searchExpert.toLowerCase()) || expert.surname.toLowerCase().includes(searchExpert.toLowerCase()) || expert.patronymic.toLowerCase().includes(searchExpert.toLowerCase()));
        }
        return Experts;
    }, [searchExpert, Experts])


    const ShowAddModule = (changemodal) => {
        setchangeForm(changemodal);
        setAddModule(true);
    }

    const CheckAddNewExpert = (newexpert) => {
        console.log(newexpert);
        if(newexpert.name == '' || newexpert.surname == '' || newexpert.patronymic == '' || newexpert.BirthYear == '' )
        {
            console.log("Неправильно заданы данные эксперта");
        }
        //setAddModule(false);
        AddNewExpert(newexpert);

    }

    const AddNewExpert = async (newexpert) => {   
            const response = await fetch('https://localhost:7006/api/project/addexpert',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        Surname: newexpert.surname, 
                        Name: newexpert.name, 
                        Patronymic: newexpert.patronymic,
                        BirthYear: newexpert.birthYear,
                        ServiceYear: newexpert.serviceYear,
                        FlightHours: newexpert.flightHours,
                        Education: newexpert.educationNavigation,
                        PilotClass: newexpert.pilotClass,
                        AircraftTypes: newexpert.expertAircraftTypes,
                      }),
                    });
        
        fetchExperts()
        setAddModule(false);
    }

    const CheckChangeExpert = (changeexpert) =>{
        if(changeexpert.name == '' || changeexpert.surname == '' || changeexpert.patronymic == '' || changeexpert.BirthYear == '' )
        {
            console.log("Неправильно заданы данные эксперта");
        }

        Changexpert(changeexpert);
    }

    const Changexpert = async (changeexpert) => {   
        const response = await fetch('https://localhost:7006/api/project/changeexpert',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
                body: JSON.stringify({
                    Id: selectedExpert.id,
                    Surname: changeexpert.surname, 
                    Name: changeexpert.name, 
                    Patronymic: changeexpert.patronymic,
                    BirthYear: changeexpert.birthYear,
                    ServiceYear: changeexpert.serviceYear,
                    FlightHours: changeexpert.flightHours,
                    Education: changeexpert.educationNavigation,
                    PilotClass: changeexpert.pilotClass,
                    AircraftTypes: changeexpert.expertAircraftTypes,
                  }),
                });
    
    fetchExperts()
    setAddModule(false);
}


    const CheckRemoveExpert = () => {
        console.log(selectedExpert);
        if (selectedExpert){
            RemoveExpert();
        }
    }

    const RemoveExpert = async () => {
        const response = await fetch('https://localhost:7006/api/project/removeexpert',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: selectedExpert.id
            })
        })

        fetchExperts();

    }


    return(
    <div className="page2">
    <span>Поиск эксперта БД:</span>
          <div className="searchexpert">
            <MyInput placeholder="Поиск.." value={searchExpert} onChange={e => setSearchExpert(e.target.value)} ></MyInput>
            </div>
            <div className="expertcomm">
            <MyButton onClick={() => ShowAddModule(true)} className="button1">Добавить</MyButton>
              <MyButton onClick={() => selectedExpert ? ShowAddModule(false) : () =>{}}className="button1">Изменить</MyButton>
              <MyButton onClick={CheckRemoveExpert} className="button1">Удалить</MyButton>
            </div>
            
                <div className="ExpertPanel">
                    <div className="ExpertPanel left">
                <ExpertsList  onSelect={setSelectedExpert} Experts={SearchedExperts}></ExpertsList>
                </div>
                <div className="ExpertPanel right">
                <ExpertDetails Expert={selectedExpert}></ExpertDetails>
                </div>
                </div>

                <div>
                    {addModule &&(
                        <div>
                            {changeForm 
                            ?(<AddForm aircrafttypes={AircraftTypes} addModule={addModule} setAddModule={setAddModule} AddChangeExpert={CheckAddNewExpert}></AddForm>)
                            : (<AddForm aircrafttypes={AircraftTypes} addModule={addModule} setAddModule={setAddModule} AddChangeExpert={CheckChangeExpert} ChangeExpert={selectedExpert}></AddForm>)}
                            </div>

                    )}
                    
                </div>
    </div>
    );
}

export default Experts;
