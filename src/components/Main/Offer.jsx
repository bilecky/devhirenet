import React, { useContext } from 'react'
import { CiBookmark } from 'react-icons/ci'
import { MdLocationOn } from 'react-icons/md'
import { useAppState } from '../../context'
import { AiFillDollarCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
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
	const [showTooltip, setShowTooltip] = React.useState(false)

	const isOfferLiked = likedOffers
		? likedOffers.some(offer => offer.id === id)
		: false

	const handleToggleLike = () => {
		if (isOfferLiked) {
			const updatedOffers = likedOffers.filter(
				offer => offer.id !== id
			)
			setLikedOffers(updatedOffers)
			setShowTooltip('Offer Deleted')
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
			setShowTooltip('Offer Added')
		}
		setTimeout(() => setShowTooltip(false), 2000)
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
					<Link to={`/offer/${id}`} key={id}>
						<h3 className='text-lg font-bold'>
							{position}{' '}
							<span
								className='text-gray-500'
								style={{ fontSize: '12px' }}
							>
								({level})
							</span>
						</h3>
					</Link>

					<p className='text-md'>{company}</p>
					<p className='text-sm flex items-center my-1'>
						<AiFillDollarCircle />
						{salaryRange}
					</p>
					<p className='text-sm flex items-center'>
						<MdLocationOn className='mr-1' />
						{location}
					</p>
				</div>
				<div className='relative'>
					<CiBookmark
						className={`cursor-pointer text-xl font-black mx-2 ${
							isOfferLiked ? 'text-red-500' : 'text-gray-500'
						}`}
						onClick={handleToggleLike}
					/>
					{showTooltip && (
						<div
							className='absolute text-center top-0 right-0 bg-slate-50  text-black p-1 rounded'
							style={{ fontSize: '12px' }}
						>
							{showTooltip}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Offer
