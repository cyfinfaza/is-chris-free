export async function GET() {
	let value = await (await fetch('https://kvdb.io/86HBE3P3QxhmN1pqDRwzpW/is-free')).text();
	return new Response(JSON.stringify({ value }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
