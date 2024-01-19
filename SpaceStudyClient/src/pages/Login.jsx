import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBCardText,
} from "mdb-react-ui-kit";

import { Input, InputGroup, Message, Modal, toaster } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import AuthUserComponent from "../actions/AuthUserComponent";

const styles = {
    width: 815,
};

const MessageAuthFailed = (
    <Message showIcon type="error" closable style={{ marginBottom: "15px" }}>
        Невірний Email або пароль.
    </Message>
);

const Login = ({ }) => {
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [cookies, setCookie] = useCookies(["email", "id"]);

    <AuthUserComponent></AuthUserComponent>

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "/login/authorization",
          { email, password, remember },
          { withCredentials: true }
        );
        const hashToken = response.headers.get('hashToken');
        const userId = response.headers.get('userId');
    
        setCookie("hashToken", hashToken);
        setCookie("userId", userId);
          
        navigate("/main");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toaster.push(MessageAuthFailed, {
            placement: "bottomCenter",
            duration: 5000,
          });
        }
        console.error(error);
      }
    };

    const handleChange = () => {
        setVisible(!visible);
    };

    const handleRemember = (value) => {
        setRemember(value);
    };

    return (
        <MDBContainer
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                marginTop: "-40px",
            }}
        >
            <MDBCard>
                <MDBRow className="g-0 d-flex align-items-center mb-0">
                    <MDBCol md="4">
                        <MDBCardImage
                            src="/logo_auth.png"
                            alt="phone"
                            className="rounded-t-5 rounded-tr-lg-0"
                            fluid
                        />
                    </MDBCol>

                    <MDBCol md="8">
                        <MDBCardBody>
                            <MDBInput
                                className="color"
                                wrapperClass="mb-4"
                                label="Логін (Email адреса)"
                                id="mail"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <MDBInput
                                wrapperClass="mb-4"
                                label="Пароль"
                                id="pass"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* <InputGroup inside style={styles}>
                <Input type={visible ? "text" : "password"} />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup> */}

                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox
                                    name="flexCheck"
                                    value=""
                                    id="flexCheckDefault"
                                    label="Запам`ятати мене"
                                    checked={remember}
                                    onChange={handleChange}
                                />
                                <a href="resetpassword">Забули пароль?</a>
                            </div>

                            <MDBBtn
                                className="mb-4 w-100"
                                onClick={handleSubmit}
                            >
                                Авторизація
                            </MDBBtn>

                            <div className="d-flex justify-content-between mx-4 mt-3">
                                <MDBCardText className="mb-0">
                                    Відсутній акаунт?
                                </MDBCardText>
                                <a href="register">Зареєструватись</a>
                                {/* <a href="main">ОТЛАДКА [Сразу на главную страницу]</a> */}
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
};

export default Login;
