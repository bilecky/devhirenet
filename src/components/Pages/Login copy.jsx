import React, { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import { useAppState } from '../../context';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useAppState();
  const myTheme = {
    formSection: {
      backgroundColor: 'black',
    },
    sectionHeader: {
      backgroundColor: 'black',
    },
  };

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
        setIsLoggedIn(true);
        navigate('/'); // Przeładowanie strony głównej po zalogowaniu
      } catch (error) {
        console.log('Nie udało się zalogować:', error);
      }
    };

    checkUser();
  }, [navigate, isAuthenticated]);

  const handleSignIn = async () => {
    try {
      await Auth.signIn('username', 'password'); // Zastąp 'username' i 'password' odpowiednimi danymi uwierzytelniającymi
      setIsAuthenticated(true);
      setIsLoggedIn(true);
      navigate('/'); // Przeładowanie strony głównej po zalogowaniu
    } catch (error) {
      console.log('Nie udało się zalogować:', error);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Authenticator theme={myTheme} onSignIn={handleSignIn}>
        {isLoggedIn && (
          <div className="text-center text-green-500">
            Zalogowałeś się pomyślnie!
          </div>
        )}
      </Authenticator>
    </div>
  );
};

export default Login;
