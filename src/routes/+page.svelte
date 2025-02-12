<script>
	export let data;
	console.log(data);
</script>

<img src="/chris.png" alt="chris" style="width: 150px;" />
<h2>Is Chris free?</h2>
<p style="font-size: 4rem;"><em>{data.isFree || '?'}</em></p>
