import React, { useState } from 'react'
import { useAppState } from '../../context'
import { FiFilter, FiSearch } from 'react-icons/fi'
import Wrapper from '../../wrapper'

const Search = () => {
	const { setFilterOptions, offers } = useAppState()

	const [showFilterModal, setShowFilterModal] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [inputPlaceholder, setInputPlaceholder] =
		useState('Search...')

	const handleSalarySliderChange = event => {
		const { value } = event.target
		setFilterOptions(prevOptions => ({
			...prevOptions,
			salary: [+value[0], +value[1]],
		}))
	}

	const handleLevelSelectChange = event => {
		const { value } = event.target
		setFilterOptions(prevOptions => ({
			...prevOptions,
			level: value,
		}))
	}

	const handleFilterClick = () => {
		setShowFilterModal(true)
	}

	const handleFilterModalClose = () => {
		setShowFilterModal(false)
	}

	const handleFormSubmit = event => {
		event.preventDefault()
		applySearchQuery(searchQuery)
	}

	const handleSearchInputChange = event => {
		setSearchQuery(event.target.value)
		applySearchQuery(event.target.value)
	}

	const handleInputFocus = () => {
		setInputPlaceholder(
			'Enter position, location or company name'
		)
	}

	const handleInputBlur = () => {
		setInputPlaceholder('Search...')
	}

	const applySearchQuery = query => {
		if (query) {
			const filteredOffers = offers.filter(
				offer =>
					offer.position
						.toLowerCase()
						.includes(query.toLowerCase()) ||
					offer.company
						.toLowerCase()
						.includes(query.toLowerCase()) ||
					offer.location
						.toLowerCase()
						.includes(query.toLowerCase())
			)
			setFilterOptions(prevOptions => ({
				...prevOptions,
				searchQuery: query,
				filteredOffers,
			}))
		} else {
			setFilterOptions(prevOptions => ({
				...prevOptions,
				searchQuery: '',
				filteredOffers: offers,
			}))
		}
	}

	return (
		<div className='bg-gray-800'>
			<Wrapper>
				<h2 className='text-yellow-50 font-open text-2xl text-center py-5 font-semibold'>
					Connecting talent. Empowering Careers. DevHireNet.
				</h2>
				<div className='relative w-full'>
					<form onSubmit={handleFormSubmit}>
						<input
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
							onChange={handleSearchInputChange}
							type='text'
							className='w-full px-4 py-2 pl-10 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder={inputPlaceholder}
						/>
						<FiSearch
							className='absolute top-2 left-2 text-gray-400'
							size={18}
						/>
					</form>
				</div>
				<button
					className='w-full sm:w-2/3 flex m-auto items-center justify-center mt-4 py-2 bg-blue-500 rounded-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
					onClick={handleFilterClick}
				>
					Filter
				</button>

				{showFilterModal && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
						<div className='bg-white rounded-lg p-4'>
							<h2 className='text-xl font-bold mb-4'>Filters</h2>
							{/* Add filter options */}
							<button
								className='bg-blue-500 text-white px-4 py-2 rounded-lg'
								onClick={handleFilterModalClose}
							>
								Zamknij
							</button>
						</div>
					</div>
				)}
			</Wrapper>
		</div>
	)
}
export default Search
