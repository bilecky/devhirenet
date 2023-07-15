import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useAppState } from '../../context'
import Offer from '../Main/Offer'
import Wrapper from '../../wrapper'


const Favorites = () => {
	const { likedOffers, isAuthenticated, authUserName, darkMode } = useAppState()
	if (!isAuthenticated) {
		return null
	}


	return (
		<Wrapper  >
			<div className={`absolute top-0 left-0 w-full h-full z-[-10] ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}></div>

			<div className={`relative ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} mt-14 lg:mt-0`}>
				<Link to='/'>
					<FiArrowLeft
						size={38}
						className='absolute -top-10 lg:top-3 left-0 icon text-gray-50 font-semibold bg-blue-500'
					/>
				</Link>
				<h2 className={`text-2xl font-bold text-center py-8 ${darkMode && 'text-white'}`}>
					Hello <span className='uppercase text-blue-500'>{authUserName}</span>, you have <span className='text-blue-500'>{likedOffers && likedOffers.length}</span> {`${likedOffers.length === 1 ? 'saved offer' : 'saved offers'}`}:
				</h2>
				<div className='flex-col m-auto lg:w-2/3'>
					{likedOffers.map(favOffer => (
						<Offer key={favOffer.id} {...favOffer} darkMode={darkMode} />
					))}
				</div>
			</div>
		</Wrapper>
	)
}

export default Favorites
