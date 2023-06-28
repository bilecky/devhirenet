import React from 'react'
import { Amplify, Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../context'

import awsExports from '../../aws-exports'

Amplify.configure(awsExports)

const Login = () => {
	const navigate = useNavigate()
	const { checkAuth } = useAppState()

	const handleSignIn = async event => {
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const password = form.elements.password.value

		try {
			await Auth.signIn(username, password)
			console.log('User signed in successfully')
			checkAuth()
			navigate('/')
		} catch (error) {
			console.log('Failed to sign in:', error)
		}
	}

	return (
          <div className="flex justify-center items-center h-screen">
          <div className="w-80">
            <form className="bg-slate-100 shadow-md rounded-md px-6 py-4">
              <label htmlFor="username" className="block mb-2 font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <label htmlFor="password" className="block mt-4 mb-2 font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
        
        
	)
}

export default Login
