import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	Outlet,
	useNavigate,
} from 'react-router-dom'
import { RiArrowGoBackLine } from 'react-icons/ri'

import Navbar from './components/Header/Navbar'
import OffersList from './components/Main/OffersList'
import Favorites from './components/Pages/Favorites'


const App = () => {
	return (
		<Router>
			<div>
				<Navbar />

				<Routes>
					<Route path='/' element={<OffersList />} />
					<Route path='/offer/:id' element={<OfferDetails />} />
          <Route path='/favorites' element={<Favorites/>}/>
				</Routes>
			</div>
		</Router>
	)
}

const OfferDetails = () => {
	const navigate = useNavigate()

	return (
		<div>
			<div className='fixed top-4 left-4'>
				<RiArrowGoBackLine
					className='text-3xl cursor-pointer'
					onClick={() => navigate(-1)}
				/>
			</div>
			<h1>Offer Details</h1>
			{/* Reszta zawartości komponentu OfferDetails */}
		</div>
	)
}

export default App
