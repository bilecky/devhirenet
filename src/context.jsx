/* eslint-disable react/prop-types */
import { Amplify, Auth } from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

import React from 'react'
// create a context for the app state
const AppStateContext = React.createContext()

// create a provider component to wrap the app

// create a custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAppState = () => {
	return React.useContext(AppStateContext)
}

const savedOffers = JSON.parse(
	localStorage.getItem('initialLikedOffers') || '[]'
)
export const AppStateProvider = ({ children }) => {
	//AUTH AMPLIFY

	const [isAuthenticated, setIsAuthenticated] = React.useState(false);

	// check authentication status
	const checkAuth = async () => {
	  try {
	    await Auth.currentAuthenticatedUser();
	    setIsAuthenticated(true);

	  } catch (error) {
	    setIsAuthenticated(false);
	  }
	};
   
	// check authentication status on mount
	React.useEffect(() => {
	  checkAuth();
	}, []);

	const [offers, setOffers] = React.useState([])

	const [loading, setLoading] = React.useState(false)

	// state for dark/light mode
	const [darkMode, setDarkMode] = React.useState(false)

	// state for liked offers
	const [likedOffers, setLikedOffers] = React.useState(savedOffers)

	// state for filter options
	const [filterOptions, setFilterOptions] = React.useState({
		technologies: 'all',
		level: 'all',
		searchQuery: '',
		filteredOffers: [],
	})

	const fetchJobOffers = async () => {
		setLoading(true)
		try {
			const response = await fetch(
				'https://76bhjefw83.execute-api.eu-west-1.amazonaws.com/DevHireNet_FetchOffers'
			)
			const data = await response.json()
			setOffers(data)
			setLoading(false)
		} catch (err) {
			setLoading(false)
		}
	}
	React.useEffect(() => {
		fetchJobOffers()
	}, [])

	React.useEffect(() => {
		// change likedOffers to initialLikedOffers
		localStorage.setItem('initialLikedOffers', JSON.stringify(likedOffers))
	}, [likedOffers])

	// value to pass to the context
	const value = {
		darkMode,
		setDarkMode,
		likedOffers,
		setLikedOffers,
		filterOptions,
		setFilterOptions,
		loading,
		setLoading,
		offers,
		setOffers,
		isAuthenticated,
		setIsAuthenticated,checkAuth 
	}

	return (
		<AppStateContext.Provider value={value}>
			{children}
		</AppStateContext.Provider>
	)
}
