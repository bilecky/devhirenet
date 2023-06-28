import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Navbar from './components/Header/Navbar';
import OffersList from './components/Main/OffersList';
import Favorites from './components/Pages/Favorites';
import { OfferDetails } from './components/Pages/OfferDetails';
import { useAppState } from './context';
import Login from './components/Pages/Login';


const App = () => {

  return (
    <Router>
      <div className="h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<OffersList />} />

          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/favorites" element={<Favorites />} />
		<Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
