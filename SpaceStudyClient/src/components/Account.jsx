import { Button, Modal } from "rsuite";
import { useEffect, useState } from "react";
import axios from "axios";

const Account = ({isOpen}) => {
    
    const [open, setOpen] = useState(isOpen);
    const [user, setUser] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                // Получение значения userId из cookie
                const userId = document.cookie.replace(/(?:(?:^|.*;\s*)userId=([^;]*).*$)|^.*$/, '$1');
                console.log(userId);
                // Выполнение GET-запроса для получения данных пользователя
                const response = await axios.get(`/user/${userId}`);
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };
        
        fetchData();
        handleOpen();
    }, []);
    
    return (
        <>
            <Modal open={open} overflow={true} onClose={handleClose} role="alertdialog">
                <Modal.Header>
                    <Modal.Title>
                        <h5 style={{textAlign:"center"}}>Обліковий запис</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {user ? (
                    <div style={{color:"white"}}>
                        <h6>Облікові дані користувача</h6>
                        <br></br>
                        <p>Імя: {user.name}</p>
                        <p>Прізвище: {user.surname}</p>
                        <p>По-батькові: {user.patronymic}</p>
                        <p>Контактний номер: {user.contact}</p>
                        <p>Email: {user.email}</p>
                        <br></br>
                        <Button>Зміна паролю</Button>
                    </div>
                ): (<p>Загрузка данных...</p>) }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Account;
