/** @type {import('next').NextConfig} */
export default {
	webpack: (config) => {
		config.devtool = "source-map";
		return config;
	},
};
