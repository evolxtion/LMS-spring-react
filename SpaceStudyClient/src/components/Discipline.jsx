import { useParams } from "react-router-dom";
import { Header, Content, Divider } from "rsuite";
import { GoogleFont } from "google-fonts";
import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";

const Discipline = ({}) => {

    <GoogleFont href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />

    const {id} = useParams();

    const [data, setData] = useState([]);

    useEffect(() =>  {
        axios.get(`/subjects/${id}`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error("Помилка при отримані даних!", error);
        })
    }, []);

    return (
        <>
            <Header>
            <h2
                    style={{
                        color: "white",
                        marginTop: "20px",
                        marginLeft: 15,
                        fontFamily: 'Inter, sans-serif',
                        fontSize:32
                    }}
                >
                    {data.name}
                </h2>
            </Header>
            <Content style={{ color: "white", marginLeft: 15, fontSize:16 }}>
                <div style={{fontFamily: 'Raleway, sans-serif'}}>
                <Divider/>
                    <div style={{fontSize:18}}>
                        {data.description}  
                    </div>
                    <br></br>
                    <br></br>
                    Дата початку курсу: {data.dateStart}
                    <br></br>
                    Дата закінчення курсу: {data.dateEnd}
                    <Divider/>
                </div>
                <Task idSubject={id}/>
            </Content>
        </>
    );

};

export default Discipline;