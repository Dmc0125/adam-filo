<script lang="ts" setup>
useHead({
	htmlAttrs: {
		lang: 'sk-SK',
	},
});

const isMenuOpen = ref(false);
const isScrolled = ref(false);

function handleScroll() {
	isScrolled.value = window.scrollY > 0;
}

onMounted(() => {
	isScrolled.value = window.scrollY > 0;
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});

function handleHome(url: string) {
	if (url === '/') {
		window.scrollTo({ top: 0 });
	}
}
</script>

<template>
	<div class="grid grid-rows-[1fr_auto] min-h-screen w-full bg-dark-100 overflow-x-hidden">
		<NavMenu :is-scrolled="isScrolled" :is-open="isMenuOpen" @close="isMenuOpen = false"></NavMenu>
		<header
			class="fixed z-10 w-full h-[100px] px-5 xl:px-[clamp(1.25rem,10%,100px)] flex items-center justify-between text-gray-100 transition-all border border-dark-100"
			:class="{ 'bg-dark-100/5 backdrop-blur-sm h-[70px] border-gray-400/10': isScrolled }"
		>
			<h1 class="font-[Inter] font-semibold text-2xl">Adam Filo</h1>

			<nav class="flex gap-x-6">
				<IconLink
					v-for="social in socials"
					:key="social.url"
					:url="social.url"
					class="w-10 h-10"
					:aria-label="social.label"
				>
					<component :is="social.icon" aria-hidden></component>
				</IconLink>

				<button aria-label="menu" class="w-10 h-10 p-1" @click="isMenuOpen = !isMenuOpen">
					<IconsMenu aria-hidden class="w-full h-full"></IconsMenu>
				</button>
			</nav>
		</header>

		<slot></slot>

		<footer
			class="w-full mt-20 md:mt-52 p-5 xl:px-[clamp(1.25rem,10%,100px)] flex justify-between items-end sm:items-center text-gray-100"
		>
			<ul class="flex gap-x-2 sm:gap-x-4">
				<li v-for="social in socials" :key="social.url">
					<IconLink :url="social.url" class="w-10 h-10" :aria-label="social.label">
						<component :is="social.icon" aria-hidden></component>
					</IconLink>
				</li>
			</ul>

			<nav class="w-full max-w-[200px] sm:max-w-full">
				<ul class="flex gap-y-2 gap-x-6 flex-wrap items-end justify-end">
					<li v-for="link in links" :key="link.url">
						<NuxtLink
							:to="link.url"
							class="text-sm md:text-base hover:text-theme"
							:class="{ 'text-theme': activePath === link.url }"
							@click="handleHome(link.url)"
							>{{ link.name }}</NuxtLink
						>
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

*:focus {
	outline: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: 'DM Serif Display';
}

html {
	scroll-behavior: smooth;
}
</style>

<style lang="postcss">
*:focus {
	@apply ring-2 ring-theme ring-offset-2 ring-offset-dark-100;
}
</style>
