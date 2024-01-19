import {
    Content,
    Header,
    Divider,
    Table,
    Dropdown,
    Popover,
    Whisper,
    IconButton,
} from "rsuite";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthUserComponent from "../actions/AuthUserComponent";
import MoreIcon from "@rsuite/icons/legacy/More";

let selectedId = null;

// Функция для установки значения id
const setSelectedId = (id) => {
  selectedId = id;
};

const deleteDiscipline = async ({id}) => {
    console.log(id);
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/subjects/${id}`); // Замените '4' на нужный вам идентификатор дисциплины
            console.log(response.data); // Выводим ответ от сервера
        } catch (error) {
            console.error(error);
        }
    };

    handleDelete();

};

const renderMenu = ({ onClose, left, top, className, rowData}, ref) => {
    const handleSelect = (eventKey) => {
        onClose();
        console.log(eventKey);
        if(eventKey === 4){
            deleteDiscipline(selectedId);
        }
    };
    
    return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item eventKey={1}>Редагувати</Dropdown.Item>
                <Dropdown.Item eventKey={2}>Додати группу</Dropdown.Item>
                <Dropdown.Item eventKey={3}>Інформація</Dropdown.Item>
                <Dropdown.Item eventKey={4} style={{ color: "#da4444" }}>
                    Видалити
                </Dropdown.Item>
            </Dropdown.Menu>
        </Popover>
        
    );
};

const ActionCell = ({ rowData, dataKey, ...props }) => {
    const handleClick = () => {
        // Установите значение id перед вызовом renderMenu
        setSelectedId();
    };
    

    return (
        <Table.Cell
            {...props}
            style={{ paddingLeft: 1, paddingTop: 5 }}
            className="link-group"
        >
            <Whisper
                placement="autoVerticalStart"
                trigger="click"
                speaker={renderMenu}
            >
                <IconButton appearance="subtle" icon={<MoreIcon />} onClick={handleClick(dataKey)} />
            </Whisper>
        </Table.Cell>
    );
};

const AdminDiscipline = ({}) => {
    <AuthUserComponent />;

    const [data, setData] = useState([]);
    const [fillHeight, setFillHeight] = useState(false);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);

    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === "string") {
                    x = x.charCodeAt();
                }
                if (typeof y === "string") {
                    y = y.charCodeAt();
                }
                if (sortType === "asc") {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return data;
    };

    useEffect(() => {
        axios
            .get("/subjects/all")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Помилка при отримані даних!", error);
            });
    }, []);

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
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
                    Адміністрування дисциплін
                </h2>
            </Header>
            <Content style={{ color: "white" }}>
                <Divider />
                <Table
                    showHeader={true}
                    width={1632}
                    height={500}
                    data={getData()}
                    sortColumn={sortColumn}
                    sortType={sortType}
                    onSortColumn={handleSortColumn}
                    loading={loading}
                >
                    <Table.Column width={120}>
                        <Table.HeaderCell>
                            <MoreIcon />
                        </Table.HeaderCell>
                        <ActionCell dataKey="id" />
                    </Table.Column>
                    <Table.Column width={100} align="center" resizable sortable>
                        <Table.HeaderCell>ID Курсу</Table.HeaderCell>
                        <Table.Cell dataKey="idCourse" />
                    </Table.Column>
                    <Table.Column width={308} align="center" resizable sortable>
                        <Table.HeaderCell>Назва курсу</Table.HeaderCell>
                        <Table.Cell dataKey="name" />
                    </Table.Column>
                    <Table.Column width={308} align="center" resizable sortable>
                        <Table.HeaderCell>Опис</Table.HeaderCell>
                        <Table.Cell dataKey="description" />
                    </Table.Column>
                    <Table.Column width={308} align="center" resizable sortable>
                        <Table.HeaderCell>Дата початку</Table.HeaderCell>
                        <Table.Cell dataKey="dateStart" />
                    </Table.Column>
                    <Table.Column width={308} align="center" resizable sortable>
                        <Table.HeaderCell>Дата закінчення</Table.HeaderCell>
                        <Table.Cell dataKey="dateEnd" />
                    </Table.Column>
                    <Table.Column width={308} align="center" resizable sortable>
                        <Table.HeaderCell>ID викладача</Table.HeaderCell>
                        <Table.Cell dataKey="teacherId" />
                    </Table.Column>
                </Table>
            </Content>
        </>
    );
};

export default AdminDiscipline;
