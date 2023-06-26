import React, { useState, useEffect } from 'react'
import { useAppState } from '../../context'
import { FiFilter, FiSearch } from 'react-icons/fi'
import Wrapper from '../../wrapper'

const Search = () => {
	const { setFilterOptions, offers, filterOptions } =
		useAppState()

	const [showFilterModal, setShowFilterModal] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [inputPlaceholder, setInputPlaceholder] =
		useState('Search...')

	useEffect(() => {
		applySearchQuery(searchQuery)
	}, [filterOptions.level, filterOptions.technologies])

	console.log(filterOptions)

	const handleTechnologiesSelectChange = event => {
		const { value } = event.target
		setFilterOptions(prevOptions => ({
			...prevOptions,
			technologies: [value],
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
		const { level, technologies } = filterOptions

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

			let filteredByLevelAndTechnology

			if (level === 'all') {
				filteredByLevelAndTechnology = filteredOffers
			} else {
				filteredByLevelAndTechnology = filteredOffers.filter(
					offer =>
						offer.level.toLowerCase() === level.toLowerCase()
				)
			}

			if (technologies[0] === 'all') {
				filteredByLevelAndTechnology = filteredOffers
			}

			// Filtruj oferty na podstawie wybranych technologii
			else if (
				Array.isArray(technologies) &&
				technologies.length > 0
			) {
				filteredByLevelAndTechnology =
					filteredByLevelAndTechnology.filter(offer =>
						technologies.some(technology =>
							offer.technologies
								.map(t => t.toLowerCase())
								.includes(technology.toLowerCase())
						)
					)
			}

			setFilterOptions(prevOptions => ({
				...prevOptions,
				searchQuery: query,
				filteredOffers: filteredByLevelAndTechnology,
			}))
		} else {
			let filteredByLevelAndTechnology

			if (level === 'all') {
				filteredByLevelAndTechnology = offers
			} else {
				filteredByLevelAndTechnology = offers.filter(
					offer =>
						offer.level.toLowerCase() === level.toLowerCase()
				)
			}

			// Filtruj oferty na podstawie wybranych technologii
      if (technologies[0] === 'all') {
				filteredByLevelAndTechnology = offers
			} else if (
				Array.isArray(technologies) &&
				technologies.length > 0
			) {
				filteredByLevelAndTechnology =
					filteredByLevelAndTechnology.filter(offer =>
						technologies.some(technology =>
							offer.technologies
								.map(t => t.toLowerCase())
								.includes(technology.toLowerCase())
						)
					)
			}

			setFilterOptions(prevOptions => ({
				...prevOptions,
				searchQuery: '',
				filteredOffers: filteredByLevelAndTechnology,
			}))
		}
	}

	return (
		<div className='bg-gray-800 ' style={{ paddingBottom: 0 }}>
			<Wrapper className=''>
				<h2 className='  text-yellow-50 font-open text-2xl text-center py-5 font-semibold'>
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
					className='w-full sm:w-2/3 flex m-auto items-center justify-center mt-4 p-2 bg-blue-500 rounded-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
					onClick={handleFilterClick}
				>
					<FiFilter className='mr-' />
					Filter
				</button>
				handleTechnologiesSelectChange
				{showFilterModal && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
						<div className='bg-white  p-10 w-2/3'>
							<h2 className='text-xl font-bold mb-4'>Filters</h2>
							<div className='mb-4'>
								<label className='block mb-2 font-semibold'>
									Technology:
								</label>
								<select
									value={filterOptions.technologies[0]}
									onChange={handleTechnologiesSelectChange}
									className='w-full bg-slate-100'
								>
									<option value='all'>All Levels</option>
									<option value='java'>Java</option>
									<option value='javascript'>JavaScript</option>
									<option value='HTML'>HTML</option>
									<option value='swift'>Swift</option>
									<option value='Node.js'>Node.js</option>
									<option value='SQL'>SQL</option>
									<option value='Kubernetes'>Kubernetes</option>
									<option value='Docker'>Dockers</option>
									<option value='FPGA'>FPGA</option>
									<option value='Python'>Python</option>
									<option value='Azure'>Azure</option>
								</select>
							</div>{' '}
							{/* Filtracja poziomu */}
							<div className='mb-8'>
								<label className='block mb-2 font-semibold'>
									Level:
								</label>
								<select
									value={filterOptions.level}
									onChange={handleLevelSelectChange}
									className='w-full bg-slate-100'
								>
									<option value='all'>All Levels</option>
									<option value='junior'>Junior</option>
									<option value='mid'>Mid</option>
									<option value='senior'>Senior</option>
								</select>
							</div>{' '}
							<button
								className='bg-blue-500 text-white px-6 py-2 m-auto flex '
								onClick={handleFilterModalClose}
							>
								Back
							</button>
						</div>
					</div>
				)}
			</Wrapper>
		</div>
	)
}
export default Search
