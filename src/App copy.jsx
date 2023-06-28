import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	Outlet,
	useNavigate,
	useLocation,
	useParams,
} from 'react-router-dom'
import { RiArrowGoBackLine } from 'react-icons/ri'

import Navbar from './components/Header/Navbar'
import OffersList from './components/Main/OffersList'
import Favorites from './components/Pages/Favorites'
import { OfferDetails } from './components/Pages/OfferDetails'

const App = () => {
	return (
		<Router>
			<div className='h-screen'>
				<Navbar />

				<Routes>
					<Route path='/' element={<OffersList />} />
 
					<Route path='/offer/:id' element={<OfferDetails />} />
					<Route path='/favorites' element={<Favorites />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
