/** @type {import('next').NextConfig} */
export default {
	webpack: (config) => {
		config.devtool = "source-map";
		config.optimization = {
			minimize: false
		};
		return config;
	},
};
