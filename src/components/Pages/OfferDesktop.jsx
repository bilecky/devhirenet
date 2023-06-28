import { useAppState } from '../../context'
import { FiFilter, FiSearch, FiPlay, FiArrowLeft } from 'react-icons/fi'

import Wrapper from '../../wrapper'

export const OfferDesktop = props => {
	const { offers } = useAppState()

	const desktopId = props.offerId

	const offer = offers.find(offer => offer.id === desktopId)
	console.log(typeof desktopId)
	console.log(typeof offer)

	if (!offer) {
		return <div>Offer not found.</div>
	}

	return (
		<div className='bg-slate-50   p-5  relative mx-3'>
			<div className='flex items-center mb-4'>
				<img
					src={offer.logo}
					alt='Company Logo'
					className='w-10 h-10 rounded-full mr-3'
				/>
				<div>
					<h2 className='text-xl font-bold'>{offer.position}</h2>
					<p className='text-gray-500'>{offer.company}</p>
				</div>
			</div>
			<p className='text-sm text-gray-700 mb-4'>
				{' '}
				<span className='font-bold'>Level: </span>
				{offer.level}
			</p>
			<p className='text-sm text-gray-700 mb-4'>
				{' '}
				<span className='font-bold'>Description: </span>
				{offer.description}
			</p>
			<p className='text-sm text-gray-700 mb-4'>
				{' '}
				<span className='font-bold'>Responsibilities: </span>
				{offer.responsibilities}
			</p>
			<div className='text-sm text-gray-700 mb-4'>
				{' '}
				<span className='font-bold'>
					Technologies:
					<ul className='mt-2'>
						{offer.technologies.map((technology, index) => {
							return (
								<li className=' flex items-center text-sm' key={index}>
									<FiPlay className='mr-2' />
									{technology}
								</li>
							)
						})}
					</ul>{' '}
				</span>
			</div>
			<div className='text-sm text-gray-700 mb-4'>
				{' '}
				<span className='font-bold'>
					Benefits:
					<ul className='mt-2'>
						{offer.benefits.map((benefit, index) => {
							return (
								<li className=' flex items-center text-sm' key={index}>
									<FiPlay className='mr-2' />
									{benefit}
								</li>
							)
						})}
					</ul>{' '}
				</span>
			</div>
			<p className='text-sm text-gray-700 mb-4'>
				<span className='font-bold'>Salary Range:</span> {offer.salaryRange}
			</p>
			<p className='text-sm text-gray-700 mb-4'>
				<span className='font-bold'>Location:</span> {offer.location}
			</p>
			<button className='bg-blue-500 flex m-auto text-white py-2 px-10 mt-8 mb-6  '>
				Apply
			</button>
		</div>
	)
}
