import { json } from '@sveltejs/kit';
import { BUTTON_KEY, KVDB_KEY } from '$env/static/private';

export async function GET({ url }) {
	const value = url.searchParams.get('value');
	const apiKey = url.searchParams.get('apiKey');

	if (!value || !apiKey) {
		return json({ error: 'Missing parameters' }, { status: 400 });
	}

	if (apiKey !== BUTTON_KEY) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const response = await fetch(
			'https://kvdb.io/86HBE3P3QxhmN1pqDRwzpW/is-free?access_token=' + KVDB_KEY,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'text/plain'
				},
				body: value
			}
		);

		if (!response.ok) {
			throw new Error('Failed to send data');
		}

		return json({ success: true });
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
