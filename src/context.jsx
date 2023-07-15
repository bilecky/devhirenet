
import { Amplify, Auth } from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

import React, { useContext } from 'react'


const AppStateContext = React.createContext()


export const useAppState = () => {
	return React.useContext(AppStateContext)
}

const savedOffers = JSON.parse(
	localStorage.getItem('initialLikedOffers') || '[]'
)
export const AppStateProvider = ({ children }) => {


	const [isAuthenticated, setIsAuthenticated] = React.useState(false)
	const [authUserName, setauthenticatedUser] = React.useState('')


	const checkAuth = async () => {
		try {
			await Auth.currentAuthenticatedUser()
			setIsAuthenticated(true)
			const user = await Auth.currentAuthenticatedUser()

			setauthenticatedUser(user.username)
		} catch (error) {
			setIsAuthenticated(false)
		}
	}


	React.useEffect(() => {
		checkAuth()
	}, [])

	const [offers, setOffers] = React.useState([])

	const [loading, setLoading] = React.useState(false)


	const [darkMode, setDarkMode] = React.useState(false)


	const [likedOffers, setLikedOffers] = React.useState(savedOffers)


	const [filterOptions, setFilterOptions] = React.useState({
		technologies: 'all',
		level: 'all',
		searchQuery: '',
		filteredOffers: [],
	})

	const fetchJobOffers = async () => {
		setLoading(true);
		try {
		  const response = await fetch(
		    'https://76bhjefw83.execute-api.eu-west-1.amazonaws.com/DevHireNet_FetchOffers'
		  );
		  const data = await response.json();
		  setOffers(data);
		  setFilterOptions((prev) => ({ ...prev, filteredOffers: data }));
		  setLoading(false);
		} catch (err) {
		  setLoading(false);
		}
	   };
	   React.useEffect(() => {
		fetchJobOffers();
	   }, []);

	React.useEffect(() => {

		localStorage.setItem('initialLikedOffers', JSON.stringify(likedOffers))
	}, [likedOffers])

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
		setIsAuthenticated,
		checkAuth,
		authUserName,
		setauthenticatedUser,
	}

	return (
		<AppStateContext.Provider value={value}>
			{children}
		</AppStateContext.Provider>
	)
}
