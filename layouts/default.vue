<script lang="ts" setup>
import Mail from '@/components/icons/Mail.vue';
import Instagram from '@/components/icons/Instagram.vue';

const isMenuOpen = ref(false);

type Social = {
	url: string;
	icon: typeof Mail;
};

const socials: Social[] = [
	{ url: 'mailto:kontakt@adamfilo.com', icon: Mail },
	{ url: 'https://instagram.com/adam_filo_', icon: Instagram },
];

const route = useRoute();
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
</script>

<template>
	<div class="grid grid-rows-[auto_1fr_auto] min-h-screen w-full bg-dark-100 overflow-x-hidden">
		<NavMenu :is-scrolled="isScrolled" :is-open="isMenuOpen" @close="isMenuOpen = false"></NavMenu>
		<header
			class="fixed z-10 w-full h-[100px] px-5 xl:px-[clamp(1.25rem,10%,100px)] flex items-center justify-between text-gray-100 transition-all border border-dark-100"
			:class="{ 'bg-dark-100/5 backdrop-blur-sm h-[70px] border-gray-400/10': isScrolled }"
		>
			<h1 class="font-[Inter] font-semibold text-2xl">Adam Filo</h1>

			<nav class="flex gap-x-6">
				<a
					v-for="social in socials"
					:key="social.url"
					:href="social.url"
					target="_blank"
					rel="noopener noreferrer"
					class="hidden md:block"
				>
					<component :is="social.icon" class="w-10 h-10 p-1"></component>
				</a>

				<button class="w-10 h-10 p-1" @click="isMenuOpen = !isMenuOpen">
					<IconsMenu class="w-full h-full"></IconsMenu>
				</button>
			</nav>
		</header>

		<slot></slot>

		<footer
			class="w-full mt-20 md:mt-52 p-5 xl:px-[clamp(1.25rem,10%,100px)] flex justify-between items-end sm:items-center text-gray-100"
		>
			<ul class="flex flex-col sm:flex-row gap-y-2 gap-x-4">
				<li v-for="social in socials" :key="social.url">
					<a
						:href="social.url"
						target="_blank"
						rel="noopener noreferrer"
						class="w-10 h-10 p-1 block"
					>
						<component :is="social.icon" class="w-10 h-10 p-1"></component>
					</a>
				</li>
			</ul>

			<nav>
				<ul class="flex flex-col sm:flex-row gap-y-2 gap-x-6">
					<li v-for="link in links" :key="link.url">
						<NuxtLink
							:to="link.url"
							class="text-sm md:text-base hover:text-theme"
							:class="{ 'text-theme': route.fullPath == link.url }"
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
