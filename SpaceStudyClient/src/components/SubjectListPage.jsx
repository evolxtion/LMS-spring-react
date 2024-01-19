import { Header, Content, Divider, Panel, Button, Stack } from "rsuite";
import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SubjectListPage = ({}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/subjects/all")
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
                        marginLeft: 30,
                    }}
                >
                    Дисципліни
                </h2>
            </Header>
            <Content style={{ color: "white", marginLeft: 10 }}>
                <Divider></Divider>
                <div>
                    {data.map((item) => (
                        <Panel
                            bordered
                            shaded
                            collapsible
                            key={item.idCourse}
                            style={{
                                marginTop: 20,
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                borderRadius: 8,
                                width: 1632,
                                backgroundColor: "#282b30",
                                width: "97%",
                                color: "white",
                            }}
                            header={
                                <Stack
                                    style={{
                                        fontWeight: "bold",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>{item.name}</span>
                                    
                                </Stack>
                            }
                            
                            id={item.idCourse}
                            
                        >
                            <Divider></Divider>
                            
                            {item.description}
                            <Button style={{float:"right", marginBottom:15}} as={NavLink} key={item.idCourse} to={`${item.idCourse}`}>Перейти до курсу</Button>
                        </Panel>
                        
                    ))}
                </div>
            </Content>
        </>
    );
};

export default SubjectListPage;
