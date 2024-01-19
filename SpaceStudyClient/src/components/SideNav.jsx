import React from "react";
import { NavLink } from "react-router-dom";

import { Sidenav, Nav } from "rsuite";
import { Icon } from "@rsuite/icons";
import TaskIcon from "@rsuite/icons/legacy/Task";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import CalendarIcon from "@rsuite/icons/legacy/Calendar";
import PhoneIcon from "@rsuite/icons/legacy/Phone";
import BarLineChartIcon from "@rsuite/icons/BarLineChart";
import MoreIcon from "@rsuite/icons/More";
import PeoplesIcon from "@rsuite/icons/Peoples";
import TextImageIcon from "@rsuite/icons/TextImage";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import MemberIcon from "@rsuite/icons/Member";
import AdminIcon from "@rsuite/icons/Admin";
import AppSelectIcon from "@rsuite/icons/AppSelect";
import OperatePeopleIcon from "@rsuite/icons/OperatePeople";
import ScatterIcon from "@rsuite/icons/Scatter";
import IdMappingIcon from "@rsuite/icons/IdMapping";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlphaPicker, BlockPicker, ChromePicker, SketchPicker, SliderPicker, TwitterPicker } from "react-color";

const viewHeight = window.outerHeight;

const SubjectSvg = React.forwardRef((props, ref) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={682.667}
        height={682.667}
        viewBox="0 0 512 512"
        {...props}
    >
        <path d="M124 28.6c-16.2 4.3-30.9 16.5-37.9 31.5-2.2 4.6-4.4 11.1-5 14.3-.8 4.2-1.1 59.1-1.1 179.5 0 148.6.2 174.6 1.5 180.6 4.9 23.3 24.5 43.5 47.5 48.9 5.7 1.4 23.7 1.6 139.1 1.6 146.3 0 137.8.4 147.6-6.3 6.6-4.6 12-11.9 14.4-19.8 1.8-6 2-8.8 1.7-27.7-.3-23.1-.5-23.6-7.2-28.6-3.9-2.9-13.3-2.9-17.2 0-6.7 4.9-6.9 5.6-7.4 28-.4 16.7-.8 20.7-2 21.4-.9.6-50.6.9-132.5.7l-131-.2-4.3-2.3c-6.6-3.5-11.9-8.8-14.9-15-3.8-7.6-4-19.1-.5-26.7 4.3-9.3 13.1-16.3 22.9-18.4 3.7-.7 48-1.1 143.8-1.1 149.6 0 141.1.3 146.2-5.2 1.2-1.2 2.6-3.6 3.2-5.1.8-2 1.1-51.4 1.1-161.2 0-155 0-158.4-2-164.6-3.6-11.6-13-21-24.3-24.4-7.5-2.2-273.3-2.1-281.7.1zm274.4 32c1.4 1.4 1.6 16.3 1.6 148.9v147.4l-133.2.3c-146.5.4-137.3 0-149.8 6.3l-5 2.5V223.7c0-158.1-.5-147.3 6.7-155.7 2.1-2.4 6-5.3 8.7-6.6l5.1-2.4h132.2c118.8 0 132.3.2 133.7 1.6z" />
        <path d="M173.6 114.3c-10.9 6.1-10.6 22.1.5 27.7 3.7 1.9 6.2 2 81.9 2s78.2-.1 81.9-2c11.3-5.7 11.3-22.3 0-28-3.7-1.9-6.2-2-82.1-2h-78.3l-3.9 2.3z" />
    </svg>
));

const LogoKRKM = React.forwardRef((props, ref) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={128}
        viewBox="0 -2560 2560 2560"
        width={128}
        {...props}
    >
        <path d="M1277.333-320 504-744v-640l-397.333-216 1170.667-640 1176 640v845.333h-160v-752L2050.667-1384v640l-773.334 424Zm0-821.333 840-458.667-840-450.667L442.666-1600l834.667 458.667Zm0 640L1890.666-840v-448l-613.333 328L664-1293.333V-840l613.333 338.667Zm2.667-640ZM1277.333-944Zm0 0Z" />
    </svg>
));

const panelStyles = {
    padding: "15px 20px",
    color: "#bdd2eb",
};

const headerStyles = {
    padding: 20,
    fontSize: 20,
    background: "#9557e0",
    color: "#fff",
};

const SideNav = ({
    appearance,
    openKeys,
    expanded,
    onOpenChange,
    onExpand,
    ...navProps
}) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#d9e1eb");

    const handleLogout = () => {
      // Очистка куки
      document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'hashToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
      // Дополнительные действия после выхода из аккаунта
  
      // Перенаправление на страницу логина
      window.location.href = '/login';
    };

    const handleColorChange = (color) => {
        setBackgroundColor(color.hex);
    };

    const handleToggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    useEffect(() => {
        const authUser = async () => {
            try {
                const userId = document.cookie.replace(
                    /(?:(?:^|.*;\s*)userId=([^;]*).*$)|^.*$/,
                    "$1"
                );
                const hashToken = document.cookie.replace(
                    /(?:(?:^|.*;\s*)hashToken\s*=\s*([^;]*).*$)|^.*$/,
                    "$1"
                );
                console.log(userId);
                if (!userId || !hashToken) {
                    navigate("/login");
                    return;
                }

                const response = await axios.post("/login/auth", {
                    hashToken,
                    userId,
                });

                console.log(response.headers.get("isAdmin"));
                if (response.headers.get("isAdmin") === "true") {
                    setIsAdmin(true);
                }

                navigate("/main");
                console.log(response.data);
            } catch (error) {
                // Обработка ошибок аутентификации
                console.error(error);
                navigate("/login");
            }
        };

        authUser();
    }, []);

    return (
        <div style={{ width: 240, display: "flex", height: "100%" }}>
            <Sidenav
                style={{ backgroundColor: "#20272F", height: "100vh" }}
                appearance={appearance}
                expanded={expanded}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            >
                <Sidenav.Header>
                    <div style={headerStyles}>
                        <Icon
                            as={LogoKRKM}
                            style={{
                                marginRight: "13px",
                                marginBottom: "3px",
                                color: "#2eff2e",
                            }}
                        ></Icon>
                        LMS KRKM
                    </div>
                </Sidenav.Header>

                <Sidenav.Body>
                    <Nav {...navProps}>
                        <Nav.Item
                            eventKey="1"
                            icon={<Icon as={SubjectSvg} />}
                            style={{ backgroundColor: "#20272F" }}
                            as={NavLink}
                            to="/main/subjects"
                        >
                            Дисципліни
                        </Nav.Item>

                        <Nav.Item
                            eventKey="2"
                            icon={<TaskIcon />}
                            style={{ backgroundColor: "#20272F" }}
                            as={NavLink}
                            to="/main/queue-tasks"
                        >
                            Черга завдань
                        </Nav.Item>

                        <Nav.Item
                            eventKey="3"
                            icon={<CalendarIcon />}
                            style={{ backgroundColor: "#20272F" }}
                            as={NavLink}
                            to="/main/calendar"
                        >
                            Календар сроків
                        </Nav.Item>

                        <Nav.Item
                            eventKey="4"
                            icon={<BarLineChartIcon />}
                            style={{ backgroundColor: "#20272F" }}
                        >
                            Статистика
                        </Nav.Item>

                        <Nav.Menu
                            eventKey="5"
                            icon={<InfoOutlineIcon />}
                            style={{ backgroundColor: "#20272F" }}
                            title="Інформація"
                        >
                            <Nav.Item divider />
                            <Nav.Item
                                eventKey="5-1"
                                icon={<TextImageIcon />}
                                as={NavLink}
                                to="/main/info/common"
                            >
                                Загальна
                            </Nav.Item>
                            <Nav.Item
                                eventKey="5-2"
                                icon={<PeoplesIcon />}
                                as={NavLink}
                                to="/main/info/group-news"
                            >
                                Для групи
                            </Nav.Item>
                            <Nav.Item
                                eventKey="5-3"
                                icon={<PhoneIcon />}
                                as={NavLink}
                                to="/main/info/teachers"
                            >
                                Контакти викладачів
                            </Nav.Item>
                        </Nav.Menu>

                        {isAdmin && (
                            <Nav.Menu
                                eventKey="6"
                                title="Адміністрування"
                                icon={<AdminIcon />}
                            >
                                <Nav.Item divider />
                                <Nav.Item
                                    eventKey="6-1"
                                    as={NavLink}
                                    to="/main/admin/newgroupreg"
                                    icon={<MemberIcon />}
                                >
                                    Реєстрація групи/студента
                                </Nav.Item>
                                <Nav.Item eventKey="6-2" icon={<PeoplesIcon />}>
                                    Адміністрування груп
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="6-3"
                                    icon={<AppSelectIcon />}
                                    as={NavLink}
                                    to="/main/admin/discipline-admin"
                                >
                                    Адміністрування дисциплін
                                </Nav.Item>
                                {/* ADMIN CHECK */}
                            </Nav.Menu>
                        )}

                        {/* ADMIN CHECK NAV CATEGORY, MAYBE USING JWT */}
                        <Nav.Menu
                            eventKey="7"
                            title="Інше"
                            icon={<MoreIcon />}
                            style={{ backgroundColor: "#20272F" }}
                        >
                            <Nav.Item divider />

                            {/* <Nav.Item divider /> */}
                            <Nav.Item panel style={panelStyles}>
                                Налаштування
                            </Nav.Item>
                            <Nav.Item
                                eventKey="7-1"
                                icon={<OperatePeopleIcon />}
                                as={NavLink}
                                to="/main/account"
                            >
                                Аккаунт
                            </Nav.Item>
                            <Nav.Item
                                eventKey="7-2"
                                icon={<ScatterIcon />}
                                onClick={handleToggleColorPicker}
                            >
                                Зміна теми
                            </Nav.Item>
                            {showColorPicker && (
                              <div
                                style={{
                                  position: 'fixed',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <ChromePicker
                                    color={backgroundColor}
                                    onChange={handleColorChange}
                                />
                                </div>
                            )}
                            <style>
                                {`
                                  html, body, #root {
                                    background-color: ${backgroundColor};
                                  }
                                `}
                            </style>
                            <Nav.Item
                                eventKey="7-3"
                                icon={<IdMappingIcon />}
                                style={{ color: "#e84545" }}
                                onClick={handleLogout}
                            >
                                Вихід з аккаунта
                            </Nav.Item>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
};

export default SideNav;
