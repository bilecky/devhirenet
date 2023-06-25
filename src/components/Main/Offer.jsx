import React, { useContext } from 'react'
import { CiBookmark } from 'react-icons/ci'
import { MdLocationOn } from 'react-icons/md'
import { useAppState } from '../../context'
import {AiFillDollarCircle} from 'react-icons/ai'


const Offer = ({
	id,
	company,
	logo,
	position,
	level,
	salaryRange,
	location,
}) => {
	const { likedOffers, setLikedOffers } = useAppState()

	const isOfferLiked = likedOffers.some(offer => offer.id === id)

	const handleToggleLike = () => {
		if (isOfferLiked) {
			const updatedOffers = likedOffers.filter(
				offer => offer.id !== id
			)
			setLikedOffers(updatedOffers)
		} else {
			const selectedOffer = {
				id,
				company,
				logo,
				position,
				level,
				salaryRange,
				location,
			}
			setLikedOffers([...likedOffers, selectedOffer])
		}
	}

	return (
		<div className='flex items-center mb-4 p-2 shadow bg-slate-50'>
			<img
				src={logo}
				alt='Company Logo'
				className='w-12 h-12 mr-4 p-1'
			/>
			<div className='flex items-center justify-between w-full'>
				<div className='cursor-pointer'>
					<h3 className='text-lg font-bold'>
						{position}{' '}
						<span
							className='text-gray-500'
							style={{ fontSize: '12px' }}
						>
							({level})
						</span>
					</h3>
					<p className='text-md'>{company}</p>
					<p className='text-sm flex items-center my-1'><AiFillDollarCircle/>{salaryRange}</p>
					<p className='text-sm flex items-center'>
						<MdLocationOn className='mr-1' />
						{location}
					</p>
				</div>
				<div>
					<CiBookmark
						className={`cursor-pointer font-black mx-2	 ${
							isOfferLiked ? 'text-red-500' : 'text-gray-500'
						}`}
						onClick={handleToggleLike}
					/>
				</div>
			</div>
		</div>
	)
}

export default Offer
