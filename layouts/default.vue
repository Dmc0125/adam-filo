<script lang="ts" setup>
const isMenuOpen = ref(false);
</script>

<template>
	<div class="grid grid-rows-[auto_1fr_auto] min-h-screen bg-dark-100">
		<NavMenu @close="isMenuOpen = false" :is-open="isMenuOpen"></NavMenu>

		<header class="w-full py-8 px-5 flex items-center justify-between text-gray-100">
			<h1 class="font-[Inter] font-semibold text-2xl">Adam Filo</h1>

			<nav>
				<button class="w-10 h-10 p-1" @click="isMenuOpen = !isMenuOpen">
					<IconsMenu class="w-full h-full"></IconsMenu>
				</button>
			</nav>
		</header>

		<slot></slot>

		<footer class="w-full p-5 flex justify-between items-end text-gray-100">
			<ul class="flex flex-col gap-y-2">
				<li>
					<a
						href="https://instagram.com/adamfilo"
						target="_blank"
						rel="noopener noreferrer"
						class="w-10 h-10 p-1 block"
					>
						<IconsMail class="w-full h-full"></IconsMail>
					</a>
				</li>
				<li>
					<a
						href="mailto:kontakt@adamfilo.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-10 h-10 p-1 block"
					>
						<IconsInstagram class="w-full h-full"></IconsInstagram>
					</a>
				</li>
			</ul>

			<nav>
				<ul class="flex flex-col gap-y-2">
					<li v-for="link in links" :key="link.url">
						<NuxtLink :to="link.url" class="text-sm">{{ link.name }}</NuxtLink>
					</li>
				</ul>
			</nav>
		</footer>
	</div>
</template>

<style>
@font-face {
	font-family: 'Inter';
	src: url('/Inter.ttf');
	font-weight: 100 900;
}

@font-face {
	font-family: 'DM Serif Display';
	src: url('/DMSerifDisplay.ttf');
	font-weight: 400;
}

* {
	font-family: 'Inter';
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: 'DM Serif Display';
}
</style>
