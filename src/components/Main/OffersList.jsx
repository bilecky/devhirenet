import { useAppState } from '../../context'
import { CirclesWithBar } from 'react-loader-spinner'
import Offer from './Offer'
import React from 'react'
import { useLocation } from 'react-router'

const OffersList = () => {
	const { loading, offers, filterOptions, setFilterOptions } =
		useAppState()
          
          const [DESKTOP, SETISDESKTOP] = React.useState(false)
	const { filteredOffers, searchQuery } = filterOptions
	const location = useLocation()

	// const offersToDisplay = searchQuery ? filteredOffers : offers

     const offersToDisplay =  filteredOffers 

	const [displayedOffers, setDisplayedOffers] = React.useState(
		offersToDisplay.slice(0, 10)
	)

	//rerender when user enter sth

	React.useEffect(() => {
		setDisplayedOffers(offersToDisplay.slice(0, 10))
	}, [offersToDisplay])

	const showMoreOffers = () => {
		const currentOffersLength = displayedOffers.length
		const nextIndex = currentOffersLength + 15
		const nextOffers = offersToDisplay.slice(
			currentOffersLength,
			nextIndex
		)
		setDisplayedOffers([...displayedOffers, ...nextOffers])
	}

	//rerender filtered array when coming back to home

	React.useEffect(() => {
		if (location.pathname === '/') {
			setDisplayedOffers(offers.slice(0, 10))

			// we're clearing input so after return we have all offers
			setFilterOptions(prev => ({ ...prev, searchQuery: '' }))
		}
	}, [location.pathname, offers])

	return (
		<section className='py-4 px-8 font-open'>
			{loading ? (
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
					outerCircleColor='violet'
					innerCircleColor='violet'
					barColor='violet'
					ariaLabel='circles-with-bar-loading'
				/>
			) : offersToDisplay ? (
				<>
					{displayedOffers.map(offer => (
						<Offer key={offer.id} {...offer} />
					))}
				</>
			) : (
				'no offers '
			)}
			{offersToDisplay.length > displayedOffers.length && (
				<button
					onClick={showMoreOffers}
					className='bg-blue-500 cursor-pointer  text-white px-4 py-2 mt-4 rounded flex m-auto'
				>
					Show more{' '}
				</button>
			)}
		</section>
	)
}

export default OffersList
