import { useAppState } from '../../context'
import { CirclesWithBar } from 'react-loader-spinner'
import Offer from './Offer'
import React from 'react'

const OffersList = () => {
	const { loading, offers } = useAppState()

	const [displayedOffers, setDisplayedOffers] = React.useState(
		offers.slice(0, 10)
	)

	const showMoreOffers = () => {
		const currentOffersLength =
			displayedOffers.length
		const nextIndex = currentOffersLength + 15
		const nextOffers = offers.slice(
			currentOffersLength,
			nextIndex
		)
		setDisplayedOffers([...displayedOffers, ...nextOffers])
	}

	return (
		<section className='py-4 px-8'>
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
			) : offers ? (
				<>
					{displayedOffers.map(offer => (
						<Offer key={offer.id} {...offer} />
					))}
				</>
			) : (
				'nie ma ofert'
			)}
			{offers.length > displayedOffers.length && (
				<button
					onClick={showMoreOffers}
					className='bg-blue-500 cursor-pointer  text-white px-4 py-2 mt-4 rounded flex m-auto'
				>
					Więcej ofert
				</button>
			)}
		</section>
	)
}

export default OffersList
