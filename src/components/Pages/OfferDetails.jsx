import { useAppState } from '../../context'
import React, { useEffect, useState } from 'react'
import { FiPlay, FiArrowLeft } from 'react-icons/fi'
import Wrapper from '../../wrapper'
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner'

export const OfferDetails = () => {
	const { id } = useParams()
	const [loading, setLoading] = useState(false)
	const [offers, setOffers] = useState([])
	const offer = offers.find(offer => offer.id.toString() === id)
	const { darkMode } = useAppState()

	const fetchJobOffers = async () => {
		setLoading(true)
		try {
			const response = await fetch(
				'https://76bhjefw83.execute-api.eu-west-1.amazonaws.com/DevHireNet_FetchOffers'
			)
			const data = await response.json()
			setOffers(data)
			setLoading(false)
		} catch (err) {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchJobOffers()
	}, [])

	if (loading) {
		return (
			<CirclesWithBar
				className='py-10'
				height='100'
				width='100'
				wrapperStyle={{
					paddingTop: '160px',
					justifyContent: 'center',
				}}
				wrapperClass=''
				visible={true}
				outerCircleColor='rgb(59 130 246)'
				innerCircleColor='rgb(59 130 246)'
				barColor='rgb(59 130 246)'
				ariaLabel='circles-with-bar-loading'
			/>
		)
	}

	if (!offer) {
		return <div>Offer not found.</div>
	}

	return (
		<Wrapper darkMode={darkMode}>
			<div
				className={`absolute top-0 left-0 w-full h-full z-[-10] ${
					darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
				}`}
			></div>

			<div
				className={`bg-${
					darkMode ? 'gray-800' : 'slate-50'
				} shadow-lg rounded-lg p-6  relative`}
			>
				<Link
					to='/'
					className={`absolute top-7 right-7 icon ${
						darkMode ? 'text-gray-50' : 'text-gray-50'
					} font-semibold bg-blue-500 rounded-full p-2`}
				>
					<FiArrowLeft size={28} />
				</Link>
				<div className='flex items-center mb-4'>
					<img
						src={offer.logo}
						alt='Company Logo'
						className='w-10 h-10 rounded-full mr-3'
					/>
					<div>
						<h2
							className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
						>
							{offer.position}
						</h2>
						<p className='text-gray-500'>{offer.company}</p>
					</div>
				</div>
				<p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
					{' '}
					<span className='font-bold'>Level: </span>
					{offer.level}
				</p>
				<p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
					{' '}
					<span className='font-bold'>Description: </span>
					{offer.description}
				</p>
				<p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
					{' '}
					<span className='font-bold'>Responsibilities: </span>
					{offer.responsibilities}
				</p>
				<div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
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
				<div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
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
				<p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
					<span className='font-bold'>Salary Range:</span> {offer.salaryRange}
				</p>
				<p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
					<span className='font-bold'>Location:</span> {offer.location}
				</p>
				<button
					className={`bg-blue-500 flex m-auto text-white py-2 px-10 mt-8 mb-6 ${
						darkMode ? 'bg-blue-900' : ''
					}`}
				>
					Apply
				</button>
			</div>
		</Wrapper>
	)
}
