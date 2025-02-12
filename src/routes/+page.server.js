export const config = {
	runtime: 'edge',
	isr: {
		expiration: false // Disable static builds
	}
};

export async function load({ fetch, url }) {
	// Get API key from URL parameter
	const apiKey = url.searchParams.get('apiKey');

	// Check if API key matches environment variable
	const isAuthorized = apiKey === process.env.BUTTON_KEY;

	// Fetch the isFree value
	const isFree = await (await fetch('https://kvdb.io/86HBE3P3QxhmN1pqDRwzpW/is-free')).text();

	return {
		isFree,
		apiKey: isAuthorized ? apiKey : undefined, // Only return API key if authorized
		isAuthorized
	};
}
