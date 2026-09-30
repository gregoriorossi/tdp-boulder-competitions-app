import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';
//import basicSsl from '@vitejs/plugin-basic-ssl';


// https://vite.dev/config/
export default defineConfig({
	//server: {
	//	//https: {}
	//},
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
		sassDts({
			enabledMode: ['development', 'production']
		}),
		//basicSsl()
	]
})
