<script>
	import '../app.css';
</script>

<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

<div class="container mx-auto">
	<nav class="bg-oocreme border-gray-200 dark:bg-oodark">
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<a href="/" class="flex items-left">
				<img
					src="https://ovais.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4f78da29-4e52-4e40-8436-15155e58126c%2FUntitled.png?id=b9bd2a51-cfce-4a16-abbf-d2624ae804c9&table=block&spaceId=ce7b79e2-d861-4232-a118-daea316f3ddf&width=800&userId=&cache=v2"
					class="mr-3 h-8 sm:h-9"
					alt="Profile pic"
				/>
				<span class="text-2xl font-semibold whitespace-nowrap dark:text-white">Ovais Oozeer</span>
			</a>
			<button
				data-collapse-toggle="navbar-default"
				type="button"
				class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-default"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
			<div class="hidden w-full md:block md:w-auto" id="navbar-default">
				<ul
					class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-oocreme dark:bg-gray-800 md:dark:bg-oodark dark:border-gray-700"
				>
					<li>
						<a
							href="/now"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-oohighlight md:p-0 dark:text-white md:dark:hover:text-oohighlight dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							aria-current="page">Now</a
						>
					</li>
					<li>
						<a
							href="/next"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-oohighlight md:p-0 dark:text-white md:dark:hover:text-oohighlight dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>Next</a
						>
					</li>
					<li>
						<a
							href="/skills"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-oohighlight md:p-0 dark:text-white md:dark:hover:text-oohighlight dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>Skills</a
						>
					</li>
					<li>
						<a
							href="/employment"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-oohighlight md:p-0 dark:text-white md:dark:hover:text-oohighlight dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>Employment</a
						>
					</li>
					<li>
						<a
							href="/contact"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-oohighlight md:p-0 dark:text-white md:dark:hover:text-oohighlight dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>Contact</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<slot />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.oocreme);
		color: theme(colors.oodark);
	}
</style>
