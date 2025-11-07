/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
	output: "standalone",
	// experimental: {
	// 	workerThreads: false,
	// 	cpus: 1,
	// },
	pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
				port: "",
				pathname: "/**",
			},
		],
	},
};

// export default withBundleAnalyzer(nextConfig);
//

export default withPlaiceholder(nextConfig);
// https://placehold.co/800
