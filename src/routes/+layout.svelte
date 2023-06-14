<script>
	import '../app.css';
</script>

<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

<div class="container mx-auto">
	<div class="flex flex-row pt-8">
		<div class="basis-1/2">
			<header class="w-max text-5xl">Portfolio site</header>
		</div>
		<div class="basis-1/2 text-justify text-xl">
			<nav>
				<a href="/" class="pl-4">Home</a>
				<a href="/status" class="pl-4">Status</a>
				<a href="/plan" class="pl-4">Plan</a>
				<a href="/projects" class="pl-4">Projects</a>
				<a href="/employment" class="pl-4">Employment</a>
			</nav>
		</div>
	</div>
	<div class="pt-8">
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
