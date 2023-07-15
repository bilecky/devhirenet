import React from 'react'
import { useAppState } from '../../context'
import { FiPlay } from 'react-icons/fi'

export const OfferDesktop = props => {
	const { offers, darkMode } = useAppState()

	const desktopId = props.offerId

	const offer = offers.find(offer => offer.id === desktopId)


	if (!offer) {
		return <div>Offer not found.</div>
	}

	return (
		<div
			className={` p-5 relative mx-3 ${
				darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
			}`}
		>
			<div
				className={`flex items-center mb-4 ${darkMode ? 'text-white ' : ''}`}
			>
				<img
					src={offer.logo}
					alt='Company Logo'
					className='w-10 h-10 rounded-full mr-3'
				/>
				<div>
					<h2
						className={`text-xl font-bold ${
							darkMode ? 'text-white' : 'text-gray-900'
						}`}
					>
						{offer.position}
					</h2>
					<p className='text-gray-500'>{offer.company}</p>
				</div>
			</div>
			<p
				className={`text-sm ${
					darkMode ? 'text-white' : 'text-gray-700'
				} mb-4`}
			>
				<span className='font-bold'>Level: </span>
				{offer.level}
			</p>
			<p
				className={`text-sm ${
					darkMode ? 'text-white' : 'text-gray-700'
				} mb-4`}
			>
				<span className='font-bold'>Description: </span>
				{offer.description}
			</p>
			<p
				className={`text-sm ${
					darkMode ? 'text-white' : 'text-gray-700'
				} mb-4`}
			>
				<span className='font-bold'>Responsibilities: </span>
				{offer.responsibilities}
			</p>
			<div
				className={`text-sm ${
					darkMode ? 'text-white' : 'text-gray-700'
				} mb-4`}
			>
				<span className='font-bold'>
					Technologies:
					<ul className='mt-2'>
						{offer.technologies.map((technology, index) => {
							return (
								<li
									className={`flex items-center text-sm ${
										darkMode ? 'text-white' : ''
									}`}
									key={index}
								>
									<FiPlay className='mr-2' />
									{technology}
								</li>
							)
						})}
					</ul>
				</span>
			</div>
			<div
				className={`text-sm ${
					darkMode ? 'text-white' : 'text-gray-700'
				} mb-4`}
			>
				<span className='font-bold'>
					Benefits:
					<ul className='mt-2'>
						{offer.benefits.map((benefit, index) => {
							return (
								<li
									className={`flex items-center text-sm ${
										darkMode ? 'text-white' : ''
									}`}
									key={index}
								>
									<FiPlay className='mr-2' />
									{benefit}
								</li>
							)
						})}
					</ul>
				</span>
			</div>
			<p
				className={`text-sm ${
					darkMode ? 'text-white' : 'text-gray-700'
				} mb-4`}
			>
				<span className='font-bold'>Salary Range:</span> {offer.salaryRange}
			</p>
			<p
				className={`text-sm ${
					darkMode ? 'text-white' : 'text-gray-700'
				} mb-4`}
			>
				<span className='font-bold'>Location:</span> {offer.location}
			</p>
			<button
				className={`bg-blue-500 flex m-auto py-2 px-10 mt-8 mb-6 text-white`}
			>
				Apply
			</button>
		</div>
	)
}
