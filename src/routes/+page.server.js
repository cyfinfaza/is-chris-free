export async function load({ fetch }) {
	// Simulating fetching a value (e.g., from a database or API)
	const isFree = await (await fetch('https://kvdb.io/86HBE3P3QxhmN1pqDRwzpW/is-free')).text();

	return {
		isFree
	};
}
