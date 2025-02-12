<script>
	import { onMount } from 'svelte';

	export let data;

	let isFree = data.isFree;

	console.log(data);

	let iamchrismode;

	let showIamChris = false;

	let showTextBox = false;
	let textInBox = '';

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

	function lockiamchris() {
		if (data.isAuthorized) {
			window.localStorage.setItem('iamchris', data.apiKey);
		}
		window.location.pathname = '/';
	}

	let resetChrisCount = 0;

	function resetChris() {
		resetChrisCount++;
		if (resetChrisCount > 5) {
			if (data.isAuthorized) {
				resetChrisCount = 0;
				localStorage.removeItem('iamchris');
				window.location.reload();
			} else {
				showTextBox = true;
				console.log('showing text box');
			}
		}
	}

	onMount(() => {
		// const interval = setInterval(() => {
		// 	autoUpdate();
		// }, 1000);
		// check iamchris api key
		iamchrismode = localStorage.getItem('iamchris');
		if (iamchrismode) {
			if (!data.isAuthorized) {
				window.location.href = '/?apiKey=' + iamchrismode;
			}
		} else {
			showIamChris = true;
		}
		autoUpdate();
		return () => clearInterval(interval);
	});
</script>

<img src="/chris.png" alt="chris" style="width: 150px;" on:click={() => resetChris()} />
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
	{#if showIamChris}
		<button on:click={() => lockiamchris()}>lock iamchris mode</button>
	{/if}
{/if}
{#if showTextBox && !data.isAuthorized}
	<input type="password" bind:value={textInBox} />
	<a href={'/?apiKey=' + textInBox}>go</a>
{/if}
