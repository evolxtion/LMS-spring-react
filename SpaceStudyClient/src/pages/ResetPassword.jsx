// import "./.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const ResetPassword = ({ setIsLoggedIn }) => {
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
              src="/logo_reset.png"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>

          <MDBCol md="d-flex align-self-center flex-fill" style={{width:"350px"}}>
            <MDBCardBody>
              <div className="d-flex justify-content-center mx-4 mt-1 mb-4">
                Відновлення пароля
              </div>
              <div className="d-flex justify-content-center text-center mx-4 mt-1 mb-4">
                Вкажіть поштову скриньку Вашого акаунта для відправки форми відновлення
              </div>
              <MDBInput
                className="color"
                wrapperClass="mb-4"
                label="Логін (Email адреса)"
                id="mail"
                type="email"
              />

              <MDBBtn className="mb-4 w-100">Відправити повідомлення</MDBBtn>

                <div className="d-flex justify-content-between mx-4 mt-3">
                    <a href="login">Повернутись до авторизації</a>
                </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default ResetPassword;
