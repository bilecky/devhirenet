import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMoon, FiStar } from 'react-icons/fi'
import { ImBlog } from 'react-icons/im'
import { useAppState } from '../../context'
import Wrapper from '../../wrapper'
import Search from './Search'
import { BiSolidUser } from 'react-icons/bi'
import { Auth } from 'aws-amplify'
import { AiFillInfoCircle } from 'react-icons/ai'

const Navbar = () => {
	const {
		darkMode,
		toggleDarkMode,
		likedOffers,
		isAuthenticated,
		setIsAuthenticated,
		authUserName,
	} = useAppState()
	const location = useLocation()
	const navigate = useNavigate()

	const [showUserMenu, setShowUserMenu] = useState(false)
	const [showLoginMessage, setShowLoginMessage] = useState(false)

	const isFavoritesPage = location.pathname.includes('favorites')
	const isDetailsPage = location.pathname.includes('offer')
	const isLoginPage = location.pathname.includes('login')

	const shouldRenderHandler = isFavoritesPage || isDetailsPage || isLoginPage

	const handleSignOut = async () => {
		try {
			await Auth.signOut()
			setIsAuthenticated(false)
			navigate('/')
		} catch (error) {
			console.log('Błąd wylogowania:', error)
		}
	}

	const toggleUserMenu = () => {
		setShowUserMenu(!showUserMenu)
	}

	const handleFavoritesClick = () => {
		if (!isAuthenticated) {
			setShowLoginMessage(true)
			setTimeout(() => {
				setShowLoginMessage(false)
				navigate('/')
			}, 2000)
		}
	}

	return (
		<div
			className={`bg-gray-800 max-h-screen ${
				shouldRenderHandler ? 'h-auto' : 'lg:h-30vh'
			}`}
		>
			<Wrapper>
				<header className='flex items-center justify-between text-gray-900'>
					<Link to='/'>
						<div className='lg:text-4xl flex items-center text-gray-50'>
							<ImBlog />
							<span className='ml-3 text-2xl lg:text-4xl font-oswald'>
								DevHireNet
							</span>
						</div>
					</Link>

					<div className='flex items-center text-gray-50'>
						<button
							className='mr-6 text-yellow-500 focus:outline-none'
							onClick={toggleDarkMode}
						>
							<FiMoon size={24} />
						</button>
						<Link
							to='/favorites'
							className='flex items-center mr-6'
							onClick={handleFavoritesClick}
						>
							<FiStar size={24} />
							{isAuthenticated && (
								<span className='ml-2 text-lg'>{likedOffers?.length}</span>
							)}
						</Link>
						<div className='relative'>
							<button className='flex items-center' onClick={toggleUserMenu}>
								<BiSolidUser size={24} />
								{isAuthenticated && (
									<span className='ml-2'>{authUserName}</span>
								)}
							</button>
							{showUserMenu && (
								<div className='flex  justify-center text-center z-50 w-40 absolute top-10 right-0 bg-white shadow-md p-2'>
									{isAuthenticated ? (
										<button
											className='block w-full text-center text-gray-800 py-2 px-4 hover:bg-slate-200'
											onClick={() => {
												handleSignOut()
												setShowUserMenu(false)
											}}
										>
											Logout
										</button>
									) : (
										<Link
											to='/login'
											className='block w-full text-center text-gray-800 py-2 px-4 hover:bg-slate-200'
											onClick={() => setShowUserMenu(false)}
										>
											Log in
										</Link>
									)}
								</div>
							)}
						</div>
					</div>
				</header>
			</Wrapper>
			{showLoginMessage && (
			<div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-white z-50'>
      <div className='bg-white rounded-md p-6'>
        <AiFillInfoCircle size={48} className='text-blue-500 mx-auto mb-4' />
        <p className='text-center text-black'>
          Only logged-in users can view and add jobs to favourites.
        </p>
      </div>
    </div>
			)}
			{!shouldRenderHandler && <Search />}
		</div>
	)
}

export default Navbar
