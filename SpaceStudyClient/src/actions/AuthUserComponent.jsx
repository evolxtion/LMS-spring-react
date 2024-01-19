import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthUserComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      try {
        const userId = document.cookie.replace(/(?:(?:^|.*;\s*)userId=([^;]*).*$)|^.*$/, '$1');
        const hashToken = document.cookie.replace(/(?:(?:^|.*;\s*)hashToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        console.log(userId);
        if (!userId || !hashToken) {
          navigate('/login');
          return;
        }

        const response = await axios.post('/login/auth', {
          hashToken,
          userId,
        });

        console.log(response.headers.get('isAdmin'));
        if (response.headers.get('isAdmin') === 'true') {
          // Действия, если isAdmin === true
        }

        navigate('/main');
        console.log(response.data);
      } catch (error) {
        // Обработка ошибок аутентификации
        console.error(error);
        navigate('/login');
      }
    };

    authUser();
  }, [navigate]);

  return null;
};

export default AuthUserComponent;
