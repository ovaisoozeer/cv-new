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
				<a href="/now" class="pl-4">Now</a>
				<a href="/next" class="pl-4">Next</a>
				<a href="/education" class="pl-4">Education</a>
				<a href="/skills" class="pl-4">Skills</a>
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
