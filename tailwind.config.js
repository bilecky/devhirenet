/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./src/components/*',
	],
	theme: {
		extend: {
			height: {
				'70vh': '70vh',
				'30vh': '30vh'
			   },
			fontFamily: {
				open: ['Open Sans', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],

			},
		},
	},
	plugins: [],
}
