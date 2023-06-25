/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./src/components/*',
	],
	theme: {
		extend: {
			fontFamily: {
				open: ['Open Sans', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],

			},
		},
	},
	plugins: [],
}
