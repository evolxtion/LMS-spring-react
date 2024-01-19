import { useState, useEffect } from "react";
import { Button, Divider, Panel, Stack, Uploader } from "rsuite";
import axios from "axios";

const Task = ({ idSubject }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`/subjects/${idSubject}/tasks`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Помилка при отримані даних!", error);
            });
    }, [idSubject]);

    return (
        <>
            {data.map((item) => (
                <Panel
                    bordered
                    shaded
                    collapsible
                    key={item.idTask}
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
                >
                    <Divider />
                    {item.description}

                    <Uploader
                        action=""
                        draggable
                    >
                        <div
                            style={{
                                marginTop:20,
                                borderRadius:10,
                                height: 200,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span>
                                Натісніть або перемістіть файл для завантаження завдання
                            </span>
                        </div>
                    </Uploader>
                    <br></br>
                    <Button>Сдати роботу</Button>
                    <Button style={{marginLeft:20}}>Очистити всі файли</Button>
                </Panel>
            ))}
        </>
    );
};

export default Task;
