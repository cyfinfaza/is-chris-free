export function GET() {
	return new Response('hello', {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
