import { useAppState } from '../../context'
import { FiMoon, FiStar } from 'react-icons/fi'
import Logo from '../../assets/logo.jpg'
import Search from './Search'
import {ImBlog} from 'react-icons/im'
const Navbar = () => {
	const { darkMode, toggleDarkMode, likedOffers } = useAppState()

	return (
		<div className='bg-violet-700'>
			<header className='flex items-center justify-between py-4 px-8 text-gray-900 text-yellow-50'>
				<div className='flex items-center'>
					{/* <img src={Logo} alt='Logo' className='w-10 h-10' /> */}
          <ImBlog/>
					<span className='ml-3 text-lg font-bold'>
						DevHireNet
					</span>
				</div>
				<div className='flex items-center'>
					<button
						className='mr-6 text-yellow-500 focus:outline-none'
						onClick={toggleDarkMode}
					>
						<FiMoon size={24} />
					</button>
					<div className='flex items-center'>
						<FiStar size={24} />
						<span className='ml-2 text-lg'>
							{likedOffers.length}
						</span>
					</div>
				</div>
			</header>
		</div>
	)
}

export default Navbar
