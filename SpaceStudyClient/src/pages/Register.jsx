import "./Register.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCardText,
} from "mdb-react-ui-kit";

const Register = ({ setIsLoggedIn }) => {
  return (
    <MDBContainer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        marginTop: "-40px"
      }}
    >
      <MDBCard>
        <MDBRow className="g-0 d-flex flex-row justify-content-center align-items-center">
          <MDBCol className="d-flex flex-row justify-content-center align-items-center">
            <MDBCardImage
              src="/logo_register.png"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0 "
              style={{width:"413px"}}
            />
          </MDBCol>

          <MDBCol className="d-flex align-self-center flex-fill" style={{width:"550px"}}>
            
            <MDBCardBody>
              <div className="d-flex justify-content-center mx-4 mt-1 mb-4">
                Реєстрація студента
              </div>

              <MDBInput
                className="color"
                wrapperClass="mb-4"
                label="Логін (Email адреса)"
                id="mail"
                type="email"
              />
              <MDBInput
                className="color"
                wrapperClass="mb-4"
                label="Номер телефону"
                id="phone"
                type="numberPhone"
              />
              <MDBInput
                className="color"
                wrapperClass="mb-4"
                label="Ключ реєстрації(запросити у куратора)"
                id="text"
                type="text"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Пароль"
                id="pass"
                type="password"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Повторити пароль"
                id="passRepeat"
                type="password"
              />

              <MDBBtn className="mb-4 w-100">Реєстрація</MDBBtn>

              <div className="d-flex justify-content-between mx-4 mt-3">
                <MDBCardText className="mb-0">Вже маєте обліковий запис?</MDBCardText>
                <a href="login">Авторизація</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;
