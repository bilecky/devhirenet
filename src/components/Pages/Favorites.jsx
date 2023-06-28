import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { useAppState } from '../../context'
import Offer from '../Main/Offer'
import Wrapper from '../../wrapper'
import { Amplify, Auth } from 'aws-amplify'

const Favorites = () => {
	const { likedOffers, isAuthenticated } = useAppState()
	if (!isAuthenticated) {
		return null
	}

	const [username, setUsername] = React.useState(null)
	console.log(username)
	React.useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser()

				console.log(user)
				setUsername(user.username)
			} catch (error) {
				console.log(error)
			}
		}
		fetchUser()
	}, [])

	return (
		<Wrapper>
			<div className='relative'>
				<Link to='/'>
					<FiArrowLeft
						size={38}
						className='absolute top-3 left-0 icon text-gray-50 font-semibold bg-blue-500'
					/>
				</Link>
				<h2 className='text-2xl font-bold text-center py-8'>
					Hello <span className='uppercase text-blue-500'>{username}</span>,
					you have{' '}
					<span className='text-blue-500'>
						{likedOffers && likedOffers.length}
					</span>{' '}
					saved offers:
				</h2>
				<div className='flex-col m-auto lg:w-2/3'>
					{likedOffers.map(favOffer => (
						<Offer key={favOffer.id} {...favOffer} />
					))}
				</div>
			</div>
		</Wrapper>
	)
}

export default Favorites
