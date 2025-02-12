import { text } from '@sveltejs/kit';

export async function GET({ url }) {
	const isFree = await (await fetch('https://kvdb.io/86HBE3P3QxhmN1pqDRwzpW/is-free')).text();
	return text(isFree);
}
