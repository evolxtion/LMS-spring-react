import {
    Header,
    Content,
    Divider,
    Form,
    Button,
    ButtonToolbar,
    Table,
    Modal,
    toaster,
    Message,
} from "rsuite";
import RemindIcon from "@rsuite/icons/legacy/Remind";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageAddNewGroupSuccessful = (
    <Message
        showIcon
        type="success"
        closable
        style={{ marginBottom: "15px", fontWeight: "bold" }}
    >
        Група успішно створена
    </Message>
);

const MessageAddNewGroupFailed = (
    <Message
        showIcon
        type="error"
        closable
        style={{ marginBottom: "15px", fontWeight: "bold" }}
    >
        Виникла помилка
    </Message>
);

const AdminRegGroup = ({}) => {
    const [nameGroup, setNameGroup] = useState("");
    const [speciality, setSpeciality] = useState("");
    
    const [data, setData] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const responseTable = axios.get("/groups/all");
    console.log(responseTable);

    useEffect(()=>{
        axios.get("/groups/all")
        .then(response => {
                setData(response.data);
            }
        )
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
    }, []);

    const onChangeGroup = (value) => {
        setNameGroup(value);
    };

    const onChangeSpeciality = (value) => {
        setSpeciality(value);
    };

    const handleSubmit = (e) => {
        handleOpen();
    };

    const handleErase = (e) => {
        setNameGroup("");
        setSpeciality("");
    };

    const requestPost = async (e) => {
        try {
            const response = await axios.post(
                "/groups/add",
                { nameGroup, speciality },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                toaster.push(MessageAddNewGroupSuccessful, {
                    placement: "topCenter",
                    duration: 5000,
                });
            }
        } catch (error) {
            toaster.push(MessageAddNewGroupFailed, {
                placement: "topCenter",
                duration: 5000,
            })
            console.error(error);
        }
    };

    return (
        <>
            <Header>
                <h2
                    style={{
                        color: "white",
                        marginTop: "20px",
                        marginLeft: 10,
                    }}
                >
                    Реєстрація нової групи
                </h2>
            </Header>
            <Content style={{ color: "white" }}>
                <Divider />
                <Content style={{ marginLeft: 15, paddingRight: 30 }}>
                    Для реєстрації, потрібно сгенерувати ключ на ції сторінці.
                    Після видати його студентам. Студенти використовують його
                    для реєстрації, як обов`связковий параметр. Це автоматично
                    визначає студента до обраної групи за ключ-кодом. За цією
                    сторінкою Ви також можете переглянути групи та їх ключ-коди.
                </Content>
                <Divider />
                <h4
                    style={{
                        color: "white",
                        marginTop: "20px",
                        marginLeft: 10,
                    }}
                >
                    Створення групи
                </h4>
                <Form style={{ marginLeft: 15, marginTop: 20 }}>
                    <Form.Group controlId="name-group">
                        <Form.ControlLabel>Назва групи</Form.ControlLabel>
                        <Form.Control
                            name="name-group"
                            value={nameGroup}
                            onChange={onChangeGroup}
                        />
                        <Form.HelpText>Обов'язковий параметр</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="speciality-group">
                        {/* MAYBE UPDATE THIS FORM GROUP  */}
                        <Form.ControlLabel>
                            Спеціальність групи
                        </Form.ControlLabel>
                        <Form.Control
                            name="speciality-group"
                            value={speciality}
                            onChange={onChangeSpeciality}
                        />
                        <Form.HelpText>Обов'язковий параметр</Form.HelpText>
                        {/*  */}
                    </Form.Group>

                    <ButtonToolbar>
                        <Button
                            appearance="primary"
                            onClick={handleSubmit}
                            style={{ backgroundColor: "#9557e0" }}
                        >
                            Створити групу
                        </Button>
                        <Button appearance="default" onClick={handleErase}>
                            Очистити поля
                        </Button>
                    </ButtonToolbar>

                    <Modal open={open} onClose={handleClose} role="alertdialog">
                        <Modal.Header>
                            <Modal.Title>
                                {" "}
                                <RemindIcon
                                    style={{ color: "#ffb300", fontSize: 24 }}
                                />
                                &nbsp;Ви впевнені, що хочете добавити дану
                                групу?
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ color: "white" }}>
                            Назва групи: {nameGroup} <br></br>
                            Спеціальність групи: {speciality}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={() => {
                                    handleClose();
                                    requestPost();
                                }}
                                style={{ backgroundColor: "#9557e0" }}
                                appearance="primary"
                            >
                                Так, додати групу в БД
                            </Button>
                            <Button onClick={handleClose} appearance="subtle">
                                Ні, потребує редагування
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
                <Divider />
                <h4 style={{ marginLeft: 15, paddingRight: 30 }}>
                    Список існуючих груп та їх ключ-коди для реєстрації
                </h4>
                <Divider />
                <Table showHeader={true} width={1632} height={400} data={data}>
                    <Table.Column width={408} align="center" fixed>
                        <Table.HeaderCell>ID Групи</Table.HeaderCell>
                        <Table.Cell dataKey="idGroup" />
                    </Table.Column>
                    <Table.Column width={408} align="center">
                        <Table.HeaderCell>Назва групи</Table.HeaderCell>
                        <Table.Cell dataKey="name" />
                    </Table.Column>
                    <Table.Column width={408} align="center">
                        <Table.HeaderCell>Спеціальність</Table.HeaderCell>
                        <Table.Cell dataKey="speciality" />
                    </Table.Column>
                    <Table.Column width={408} align="center">
                        <Table.HeaderCell>Ключ реєстрації</Table.HeaderCell>
                        <Table.Cell dataKey="serialKey" />
                    </Table.Column>
                </Table>
            </Content>
        </>
    );
};

export default AdminRegGroup;
