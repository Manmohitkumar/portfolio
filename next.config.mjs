/** @type {import('next').NextConfig} */

const nextConfig = {
	output: 'export',
	distDir: 'out',
	turbopack: {},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	// Note: `eslint` config in `next.config.mjs` is no longer supported in
	// Next.js v16+. To skip ESLint during CI builds, set the env var
	// `NEXT_DISABLE_ESLINT=1` in the workflow or build environment.
	allowedDevOrigins: ["*.theopenbuilder.com"],
};

export default nextConfig;
