import React, { useContext } from 'react'
import { CiBookmark } from 'react-icons/ci'
import { MdLocationOn } from 'react-icons/md'
import { useAppState } from '../../context'
import { AiFillDollarCircle } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'

const Offer = ({
	id,
	company,
	logo,
	position,
	level,
	salaryRange,
	location,
	handleSelectDESKTOPOffer,
	singleOffer,
}) => {
	const { likedOffers, setLikedOffers, darkMode } = useAppState()
	const [showTooltip, setShowTooltip] = React.useState(false)

	const getLocation = useLocation()

	const isOfferLiked = likedOffers
		? likedOffers.some(offer => offer.id === id)
		: false

	const handleToggleLike = () => {
		if (isOfferLiked) {
			const updatedOffers = likedOffers.filter(offer => offer.id !== id)
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
		setTimeout(() => setShowTooltip(false), 700)
	}

	const handleClick = () => {
		handleSelectDESKTOPOffer(singleOffer.id)
	}

	const isFavoritesPage = getLocation.pathname.includes('favorites')

	return (
		<div
			className={`flex items-center mb-4 p-2 lg:mx-4 shadow ${
				darkMode ? 'bg-gray-900 text-white' : 'bg-slate-50 text-gray-900'
			} hover:${
				darkMode ? 'bg-gray-800 text-white' : 'bg-slate-200 text-gray-900'
			} transition duration-800`}
		>
			<img src={logo} alt='Company Logo' className='w-12 h-12 mr-4 p-1' />
			<div className='flex items-center justify-between w-full'>
				{!isFavoritesPage && (
					<div className='block lg:hidden cursor-pointer'>
						<Link to={`/offer/${id}`} key={id}>
							<h3 className={`text-sm font-bold ${darkMode && 'text-white'}`}>
								{position}{' '}
								<span
									className={`text-gray-500 ${darkMode && 'text-gray-400'}`}
									style={{ fontSize: '12px' }}
								>
									({level})
								</span>
							</h3>
						</Link>
						<p className={`text-md ${darkMode && 'text-gray-400'}`}>
							{company}
						</p>
						<p className='text-xs flex items-center my-1'>
							<AiFillDollarCircle className='mr-1' />
							{salaryRange}
						</p>
						<p className='text-xs flex items-center'>
							<MdLocationOn className='mr-1' />
							{location}
						</p>
					</div>
				)}

				{/* DESKTOP */}
				{isFavoritesPage ? (
					<div className='block cursor-pointer'>
						<Link to={`/offer/${id}`} key={id}>
							<h3 className={`text-sm font-bold ${darkMode && 'text-white'}`}>
								{position}{' '}
								<span
									className={`text-gray-500 ${darkMode && 'text-gray-400'}`}
									style={{ fontSize: '12px' }}
								>
									({level})
								</span>
							</h3>
						</Link>
						<p className={`text-md ${darkMode && 'text-gray-400'}`}>
							{company}
						</p>
						<p className='text-xs flex items-center my-1'>
							<AiFillDollarCircle className='mr-1' />
							{salaryRange}
						</p>
						<p className='text-xs flex items-center'>
							<MdLocationOn className='mr-1' />
							{location}
						</p>
					</div>
				) : (
					<div
						onClick={handleClick}
						className='hidden lg:block cursor-pointer'
					>
						<h3 className={`text-lg font-bold ${darkMode && 'text-white'}`}>
							{position}{' '}
							<span
								className={`text-gray-500 ${darkMode && 'text-gray-400'}`}
								style={{ fontSize: '12px' }}
							>
								({level})
							</span>
						</h3>
						<p className={`text-md ${darkMode && 'text-gray-400'}`}>
							{company}
						</p>
						<p className='text-xs flex items-center my-1'>
							<AiFillDollarCircle className='mr-1' />
							{salaryRange}
						</p>
						<p className='text-xs flex items-center'>
							<MdLocationOn className='mr-1' />
							{location}
						</p>
					</div>
				)}

				<div className='relative flex justify-center items-center'>
					{!showTooltip && (
						<CiBookmark
							className={`cursor-pointer text-xl font-black mx-2 ${
								isOfferLiked ? 'text-red-500' : 'text-gray-500'
							} ${darkMode && 'text-white'}`}
							onClick={handleToggleLike}
						/>
					)}
					{showTooltip && (
						<div
							className={`text-center bg-none ${
								darkMode ? 'text-white' : 'text-black'
							} p-1 rounded`}
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
