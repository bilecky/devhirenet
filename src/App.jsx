import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes,

} from 'react-router-dom'

import '@aws-amplify/ui-react/styles.css'

import Navbar from './components/Header/Navbar'
import OffersList from './components/Main/OffersList'
import Favorites from './components/Pages/Favorites'
import { OfferDetails } from './components/Pages/OfferDetails'
import { useAppState } from './context'
import Login from './components/Pages/Login'

const App = () => {
	const { darkMode } = useAppState()
	return (
		<div className={darkMode ? 'bg-gray-900' : 'bg-white'}>
			<Router>
				<div className='h-screen'>
					<Navbar />

					<Routes>
						<Route path='/devhirenet' element={<OffersList />} />

						<Route path='devhirenet/offer/:id' element={<OfferDetails />} />
						<Route path='devhirenet/favorites' element={<Favorites />} />
						<Route path='devhirenet/login' element={<Login />} />
						<Route path='devhirenet/*' element={<OffersList />} />
					</Routes>
				</div>
			</Router>
		</div>
	)
}

export default App
