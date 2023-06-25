import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useAppState } from '../../context'
import Offer from '../Main/Offer'
import Wrapper from '../../wrapper'

const Favorites = () => {
	const { likedOffers } = useAppState()



	return (
		<Wrapper>
			<div className='relative'>
				<Link to='/'>
					<FiArrowLeft
						size={38}
						className='absolute top-3 left-0 icon text-gray-50 font-semibold bg-blue-500'
					/>
				</Link>
				<h2 className='text-2xl font-bold text-center py-8'>
					Saved offers ({likedOffers && likedOffers.length}) :
				</h2>
				{likedOffers.map(favOffer => (
					<Offer key={favOffer.id} {...favOffer} />
				))}
			</div>
		</Wrapper>
	)
}

export default Favorites
