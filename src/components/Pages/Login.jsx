import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Login = () => {
  const myTheme = {
    formSection: {
      backgroundColor: 'black',
    },
    sectionHeader: {
      backgroundColor: 'black',
    },
  };

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Authenticator theme={myTheme}>
        // ...
      </Authenticator>
    </div>
  );
};

export default Login;
