/** @type {import('next').NextConfig} */
export default {
	webpack: (config) => {
		Object.defineProperty(config, "devtool", {
			get() {
				return "source-map";
			},
			set() {},
		});
		// config.devtool = "source-map";
		return config;
	},
};
