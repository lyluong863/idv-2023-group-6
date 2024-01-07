<script>
	import "styles/app.css";
	import Meta from "layouts/Meta.svelte";
	import Viewport from "layouts/Viewport.svelte"
	import { setContext } from "svelte"

	export let data;
	
	setContext("data", data)
</script>

<Meta />
<Viewport />
