<script>
	import '../app.css';
</script>

<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

<header>Portfolio site</header>
<nav>
	<a href="/">Home</a>
	<a href="/status">Status</a>
	<a href="/plan">Plan</a>
	<a href="/projects">Projects</a>
	<a href="/skills">Skills</a>
	<a href="/employment">Employment</a>
</nav>
<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
