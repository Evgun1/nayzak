/** @type {import('next').NextConfig} */

const nextConfig = {
	pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
				pathname: "/**",
			},
		],
	},
};

// export default withBundleAnalyzer(nextConfig);
//

export default nextConfig;
// https://placehold.co/800
