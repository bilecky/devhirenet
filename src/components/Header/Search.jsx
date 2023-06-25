import React, { useState } from 'react'
import { useAppState } from '../../context'
import { FiFilter, FiSearch } from 'react-icons/fi'

const Search = () => {
	const { filterOptions, setFilterOptions } = useAppState()
	const [showFilterModal, setShowFilterModal] = useState(false)

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
		// Do something with the search query
	}

	return (
		<form className="py-7 px-8 bg-violet-700">
			<h2 className='text-yellow-50 text-lg text-center py-5 font-semibold '>
				Connecting talent. Empowering Careers. DevhireNet.
			</h2>
			<div className='relative w-full'>
				<input
					type='text'
					className='w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Wyszukaj...'
					onKeyDown={event => {
						if (event.key === 'Enter') {
							handleFormSubmit(event)
						}
					}}
				/>
				<FiSearch
					className='absolute top-2 left-2 text-gray-400'
					size={18}
				/>
			</div>
			<button
				className='w-full flex items-center justify-center mt-4 py-2 bg-blue-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
				onClick={handleFilterClick}
			>
				<FiFilter size={20} className='mr-2' />
				Filtruj
			</button>
			{showFilterModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
					<div className='bg-white rounded-lg p-4'>
						<h2 className='text-xl font-bold mb-4'>Filtry</h2>
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
		</form>
	)
}

export default Search
