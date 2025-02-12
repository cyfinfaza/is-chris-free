<script>
	import { onMount } from 'svelte';

	export let data;

	let isFree = data.isFree;

	console.log(data);

	function autoUpdate() {
		if (!document.hidden) {
			console.log('fetching');
			fetch('https://kvdb.io/86HBE3P3QxhmN1pqDRwzpW/is-free', { cache: 'no-store' })
				.then((response) => response.text())
				.then((data) => {
					isFree = data;
				});
		}
	}

	function set_availability(value) {
		// it's just a GET with apiKey = data.apiKey and value = value
		fetch(`/api/set_availability?value=${value}&apiKey=${data.apiKey}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				autoUpdate();
			});
	}

	onMount(() => {
		// const interval = setInterval(() => {
		// 	autoUpdate();
		// }, 1000);
		autoUpdate();
		return () => clearInterval(interval);
	});
</script>

<img src="/chris.png" alt="chris" style="width: 150px;" />
<h2>Is Chris free?</h2>
<p style="font-size: 4rem;"><em>{isFree || '?'}</em></p>
{#if data.isAuthorized}
	<p>I confirm that I am Chris and I am:</p>
	<p>
		<button on:click={() => set_availability('yes')}>free</button>
		<button on:click={() => set_availability('no')}>not free</button>
		<button on:click={() => set_availability('stfu')}>stfu</button>
		<button on:click={() => set_availability('go away')}>go away</button>
	</p>
	<p>changes may take a moment to propagate</p>
{/if}
