import React, { useState } from 'react'
import { Amplify, Auth } from 'aws-amplify'
import { Link, useNavigate } from 'react-router-dom'
import { useAppState } from '../../context'

import awsExports from '../../aws-exports'

Amplify.configure(awsExports)

const Login = () => {
	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [code, setCode] = React.useState('')
	const [error, setError] = React.useState('')
	const [formType, setFormType] = React.useState('signIn')
	const navigate = useNavigate()
	const { checkAuth, darkMode } = useAppState()

	const handleSignInSubmit = async e => {
		e.preventDefault()
		try {
			await Auth.signIn(username, password)
			checkAuth()
			navigate('/')
		} catch (err) {
			setError(err.message)
		}
	}

	const handleSignUpSubmit = async e => {
		e.preventDefault()
		try {
			await Auth.signUp({
				username,
				password,
				attributes: {
					email,
				},
			})
			setFormType('confirmSignUp')
			setError('')
		} catch (err) {
			setError(err.message)
		}
	}

	const handleConfirmSignUpSubmit = async e => {
		e.preventDefault()
		try {
			await Auth.confirmSignUp(username, code)
			await Auth.signIn(username, password)
			checkAuth()
			navigate('/')
		} catch (err) {
			setError(err.message)
		}
	}

	const handleToggleForm = () => {
		setFormType(formType === 'signIn' ? 'signUp' : 'signIn')
	}

	return (
		<div
			className={`flex flex-col items-center justify-center h-3/4 ${
				darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
			}`}
		>
			<h1
				className={`text-3xl mb-4 ${darkMode ? 'text-white' : 'text-black'}`}
			>
				{formType === 'signIn' && 'Sign In'}
				{formType === 'signUp' && 'Sign Up'}
				{formType === 'confirmSignUp' && 'Confirm Sign Up'}
			</h1>
			{formType === 'signIn' && (
				<form onSubmit={handleSignInSubmit} className='w-80'>
					<div className='mb-4'>
						<label htmlFor='username' className='block mb-2'>
							Username
						</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='w-full border border-gray-300 p-2 text-black '
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='password' className='block mb-2'>
							Password
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='w-full border border-gray-300 p-2 text-black '
						/>
					</div>
					{error && (
						<div
							className={`bg-red-100 text-red-700 p-2 mb-4  ${
								darkMode ? 'text-white bg-red-700' : ''
							}`}
						>
							{error}
						</div>
					)}
					<button
						type='submit'
						className={`lg:w-full bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 ${
							darkMode ? 'text-white' : ''
						}`}
					>
						Sign In
					</button>
				</form>
			)}
			{formType === 'signUp' && (
				<form onSubmit={handleSignUpSubmit} className='w-80'>
					<div className='mb-4'>
						<label htmlFor='username' className='block mb-2'>
							Username
						</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='w-full border border-gray-300 p-2 text-black '
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='email' className='block mb-2'>
							Email
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='w-full border border-gray-300 p-2 text-black '
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='password' className='block mb-2'>
							Password
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='w-full border border-gray-300 p-2 text-black '
						/>
					</div>
					{error && (
						<div
							className={`bg-red-100 text-red-700 p-2 mb-4  ${
								darkMode ? ' text-white bg-red-700' : ''
							}`}
						>
							{error}
						</div>
					)}
					<button
						type='submit'
						className={`lg:w-full bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 ${
							darkMode ? 'text-white' : ''
						}`}
					>
						Sign Up
					</button>
				</form>
			)}
			{formType === 'confirmSignUp' && (
				<form onSubmit={handleConfirmSignUpSubmit} className='w-80'>
					<div className='mb-4'>
						<label htmlFor='code' className='block mb-2'>
							Verification Code
						</label>
						<input
							type='text'
							id='code'
							value={code}
							onChange={e => setCode(e.target.value)}
							className='w-full border border-gray-300 p-2 text-black '
						/>
					</div>
					{error && (
						<div
							className={`bg-red-100 text-red-700 p-2 mb-4  ${
								darkMode ? 'text-white bg-red-700' : ''
							}`}
						>
							{error}
						</div>
					)}
					<button
						type='submit'
						className={` lg:w-full bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 ${
							darkMode ? 'text-white' : ''
						}`}
					>
						Confirm
					</button>
				</form>
			)}
			<button
				onClick={handleToggleForm}
				className={`mt-4 text-blue-500 hover:text-blue-600 ${
					darkMode ? 'text-white' : ''
				}`}
			>
				{formType === 'signIn' && "Don't have an account? Sign up"}
				{formType === 'signUp' && 'Already have an account? Sign in'}
			</button>
			<p className='absolute bottom-5 font-medium'>
				designed & developed by{' '}
				<a
					className='text-blue-500 text-lg'
					href='https://github.com/bilecky'
				>
					{' '}
					Paweł Bilski
				</a>{' '}
				©2023
			</p>
		</div>
	)
}

export default Login
