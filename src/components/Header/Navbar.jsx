/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMoon, FiStar } from 'react-icons/fi'
import { ImBlog } from 'react-icons/im'
import { useAppState } from '../../context'
import Wrapper from '../../wrapper'
import Search from './Search'
const Navbar = () => {
	const { darkMode, toggleDarkMode, likedOffers } = useAppState()
	const location = useLocation()

	const isFavoritesPage = location.pathname === '/favorites'


	return (
		<div className='bg-violet-700'>
			<Wrapper>
				<header className='flex items-center justify-between  text-gray-900 text-yellow-50'>
					<div className='flex items-center'>
						<ImBlog />
						<span className='ml-3 text-lg font-bold'>
							DevHireNet
						</span>
					</div>
					<div className='flex items-center'>
						<button
							className='mr-6 text-yellow-500 focus:outline-none'
							onClick={toggleDarkMode}
						>
							<FiMoon size={24} />
						</button>
						<Link to='/favorites' className='flex items-center'>
							<FiStar size={24} />
							<span className='ml-2 text-lg'>
								{likedOffers.length}
							</span>
						</Link>
					</div>
				</header>
			</Wrapper>
			{!isFavoritesPage && <Search />} {/* Warunek renderowania dla komponentu Search */}

		</div>
	)
}

export default Navbar
