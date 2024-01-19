import "./RocketStudy.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword";
import MainPage from "./pages/MainPage";
import Teacher from "./components/Teacher";
import SubjectListPage from "./components/SubjectListPage";
import AdminRegGroup from "./pages/AdminRegGroup";
import DeadLineCalendar from "./components/DeadLineCalendar";
import Discipline from "./components/Discipline.jsx";
import QueueTask from "./pages/QueueTask";
import { useNavigate, useLocation  } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import CommonInfo from "./pages/CommonInfo";
import GroupInfo from "./pages/GroupInfo";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import AdminDiscipline from "./pages/AdminDiscipline";
import Account from "./components/Account";

function RocketStudy() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        const authUser = async () => {
          try {
            const userId = document.cookie.replace(/(?:(?:^|.*;\s*)userId=([^;]*).*$)|^.*$/, "$1");
            const hashToken = document.cookie.replace(/(?:(?:^|.*;\s*)hashToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            console.log(userId);
            if (!userId || !hashToken) {
              if(location.pathname === '/register' || location.pathname === '/resetpassword'){
                return;
              }
              navigate('/login');
              return;
            }
    
            const response = await axios.post('/login/auth', { hashToken, userId });
            if(response.status === 200){
              if(location.pathname === '/register' || location.pathname === "/login" || location.pathname === '/resetpassword'){
                navigate('/main');
              }
            }
            console.log(response.data);
          } catch (error) {
            // Обработка ошибок аутентификации
            console.error(error);
            if(location.pathname === '/register' || location.pathname === '/resetpassword'){
              return;
            }
            navigate('/login');
            return;
          }
        };
    
        authUser();
      }, [navigate]);

    // if(!isAuthenticated) {
    //   return null;
    // }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            {/* {isAuthenticated && ( */}
            <Route path="/main" element={<MainPage />}> 
              <Route path="subjects">
                  <Route index element={<SubjectListPage />}/> 
                  <Route path=":id" element={<Discipline/>} /> 
              </Route>
              <Route path="info">
                <Route path="common" element={<CommonInfo/>} />
                <Route path="group-news" element={<GroupInfo/>} />
                <Route path="teachers" element={<Teacher/>} />
              </Route>
              <Route path="calendar" element={<DeadLineCalendar />} />
              <Route path="queue-tasks" element={<QueueTask/>} />
              <Route path="admin">
                  <Route path="newgroupreg" element={<AdminRegGroup/>}/>
                  <Route path="discipline-admin" element={<AdminDiscipline/>}/>
              </Route>
              <Route path="account" element={<Account isOpen={true}/>}/>
            </Route>
            {/* )} */}
        </Routes>
    );
}

export default RocketStudy;
