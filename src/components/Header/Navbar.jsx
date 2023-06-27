/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMoon, FiStar } from 'react-icons/fi'
import { ImBlog } from 'react-icons/im'
import { useAppState } from '../../context'
import Wrapper from '../../wrapper'
import Search from './Search'
import { BiSolidUser } from 'react-icons/bi'

const Navbar = () => {
	const { darkMode, toggleDarkMode, likedOffers } = useAppState()
	const location = useLocation()

	const isFavoritesPage = location.pathname.includes('favorites')
	const isDetailsPage = location.pathname.includes('offer')
	const isLoginPage = location.pathname.includes('profile')
	const shouldRenderHandler =
		isFavoritesPage || isDetailsPage || isLoginPage

	return (
		<div
			className={`bg-gray-800 max-h-screen ${
				shouldRenderHandler ? 'h-auto' : 'lg:h-30vh'
			}`}
		>
			<Wrapper>
				<header className='flex items-center justify-between  text-gray-900'>
					<Link to='/'>
						<div className='lg:text-4xl flex items-center text-gray-50'>
							<ImBlog />
							<span className='ml-3 text-2xl  lg:text-4xl font-oswald'>
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
						>
							<FiStar size={24} />
							<span className='ml-2 text-lg'>
								{likedOffers && likedOffers.length}
							</span>
						</Link>
						<Link to='/profile' className='flex items-center'>
							<BiSolidUser size={24} />
						</Link>
					</div>
				</header>
			</Wrapper>
			<Search />
			{/* Warunek renderowania dla komponentu Search */}
		</div>
	)
}

export default Navbar
