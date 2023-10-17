<script setup lang="ts">
type Stat = {
	isDivider: false;
	data: string;
	name: string;
};
const stats: (Stat | { isDivider: true })[] = [
	{ isDivider: false, data: '173', name: 'Zákaziek' },
	{ isDivider: true },
	{ isDivider: false, data: '100%', name: 'Zákazníkov doporučuje' },
	{ isDivider: true },
	{ isDivider: false, data: '100%', name: 'Kvalita komunikácie' },
];

const { data } = await useFetch('/api/products');

type Logo = {
	id: string;
	title: string;
	description: string;
	span: string;
};

const logos: Logo[] = [
	{
		id: 'tagano',
		title: 'Tagano',
		description:
			'Ut sit ut sit maiores enim quibusdam. Perspiciatis ex minus adipisci voluptas alias.',
		span: 'col-[1/2]',
	},
	{
		id: 'leaf',
		title: 'Leaf',
		description:
			'Ut sit ut sit maiores enim quibusdam. Perspiciatis ex minus adipisci voluptas alias.',
		span: 'col-[2/4]',
	},
	{
		id: 'peterek',
		title: 'Peterek',
		description:
			'Ut sit ut sit maiores enim quibusdam. Perspiciatis ex minus adipisci voluptas alias.',
		span: 'col-[1/3]',
	},
	{
		id: 'dannys',
		title: "Danny's",
		description:
			'Ut sit ut sit maiores enim quibusdam. Perspiciatis ex minus adipisci voluptas alias.',
		span: 'col-[3/4]',
	},
];
</script>

<template>
	<section id="domov" class="mt-[25vh] w-full max-w-[420px] sm:max-w-[1100px] px-5 xl:px-0 mx-auto">
		<h1 class="text-gray-100 text-3xl sm:text-5xl md:text-6xl !leading-[135%]">
			Vylepšite svoj imidž a urobte pôsobivý prvý dojem
		</h1>
		<h2 class="font-[Inter] text-gray-200 text-base sm:text-xl mt-5 sm:max-w-[530px]">
			Volám sa Adam, som profesionálny grafický dizajnér, najmä dizajnér loga s 3 rokmi skúseností
			na voľnej nohe.
		</h2>
		<div class="flex flex-col sm:flex-row gap-x-10 gap-y-5 mt-8 font-medium">
			<NuxtLink
				href="/contact"
				class="w-full sm:w-[200px] md:w-[290px] h-14 bg-theme text-dark-100 rounded-md text-xl flex items-center justify-center"
				>Kontaktuje ma</NuxtLink
			>
			<NuxtLink
				href="/#moja-praca"
				class="w-full sm:w-[200px] md:w-[290px] h-14 bg-dark-200 text-gray-100 rounded-md text-xl flex items-center justify-center"
				>Moja práca</NuxtLink
			>
		</div>
	</section>

	<section
		id="o-mne"
		class="mt-40 sm:mt-60 md:mt-[320px] grid sm:gap-x-16 md:gap-x-20 sm:grid-rows-[min-content_1fr_auto] sm:grid-cols-2 w-full max-w-[420px] sm:max-w-[660px] px-5 md:px-0 mx-auto scroll-mt-[70px]"
	>
		<h2 class="text-gray-100 text-3xl mb-4 sm:col-[2/3]">O mne</h2>

		<img
			src="/portrait.png"
			alt="Portrét"
			class="rounded-md border border-gray-400 w-full sm:row-[1/3]"
			loading="lazy"
		/>

		<p class="mt-8 sm:mt-0 text-gray-200 text-base">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>

		<ul class="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-between gap-y-5 sm:col-[1/3]">
			<li v-for="(stat, i) in stats" :key="i">
				<h6
					v-if="!stat.isDivider"
					class="text-theme font-[Inter] font-semibold text-3xl sm:text-center"
				>
					{{ stat.data }}
				</h6>
				<p v-if="!stat.isDivider" class="text-gray-100">{{ stat.name }}</p>
				<div v-if="stat.isDivider" class="hidden sm:block bg-gray-400 h-12 w-[1px]"></div>
			</li>
		</ul>
	</section>

	<section
		id="cennik"
		class="mt-[100px] sm:mt-60 w-full max-w-[420px] sm:max-w-[660px] lg:max-w-[1100px] px-5 md:px-0 lg:px-5 xl:px-0 mx-auto scroll-mt-[70px]"
	>
		<h2 class="text-3xl text-gray-100">Cenník</h2>
		<p class="text-base text-gray-200 mt-4">
			Rád Vám pomôžem vytvoriť unikátne, moderné a profesionálne logo, keďže proces tvorby loga je o
			spolupráci. Logá dodávam vo všetkých formátoch, ktoré budete potrebovať.
		</p>

		<NuxtLink
			href="/contact"
			class="mt-5 w-full max-w-[200px] mx-auto h-10 bg-theme rounded-md flex items-center justify-center"
			>Poslať mail</NuxtLink
		>
		<span class="text-gray-300 text-sm my-5 lg:mb-10 block w-full text-center"
			>alebo si hneď vyberte balík</span
		>

		<section
			class="flex flex-col lg:flex-row gap-y-16 gap-x-10 max-w-[420px] lg:max-w-[1100px] mx-auto"
		>
			<div
				v-for="product in data"
				:key="product.name"
				class="px-5 py-8 border border-gray-400 rounded-lg relative z-0 w-full grid grid-rows-[auto_auto_auto_auto_1fr_auto_auto]"
				:class="{ 'shadow shadow-theme-200': product.mostPopular }"
			>
				<div
					v-if="product.mostPopular"
					class="py-2 absolute top-0 -translate-y-1/2 -translate-x-1/2 left-1/2 bg-theme-200 text-theme text-sm font-medium rounded-full text-center block w-[190px]"
				>
					Najpopulárnejšia voľba
				</div>

				<h3
					class="font-[Inter] text-lg text-gray-200 font-medium mb-2"
					:class="{ 'text-theme': product.mostPopular }"
				>
					{{ product.name }}
				</h3>
				<p class="text-3xl font-bold text-gray-100">{{ product.price }}</p>
				<p class="text-xs text-gray-300 font-semibold mb-2">s DPH</p>
				<p class="text-base text-gray-200">{{ product.description }}</p>

				<div class="h-full"></div>

				<ul class="mt-10 flex flex-col gap-y-3">
					<li
						v-for="[comp, val] in product.comparisons"
						:key="comp"
						class="flex items-center justify-between text-gray-200"
					>
						<p>{{ comp }}</p>
						<IconsCheckmark
							v-if="typeof val === 'boolean' && val"
							class="w-6 h-6"
							:class="{ 'text-theme': product.mostPopular }"
						/>
						<IconsCloseCircle
							v-else-if="typeof val === 'boolean' && !val"
							class="w-6 h-6 text-gray-300"
						/>
						<p v-else class="min-w-[24px] text-center block">
							{{ val }}
						</p>
					</li>
				</ul>

				<button
					class="w-full h-10 flex items-center justify-center font-medium rounded-md mt-8"
					:class="[product.mostPopular ? 'bg-theme text-dark-100' : 'text-gray-100 bg-dark-200']"
				>
					Vybrať
				</button>
			</div>
		</section>
	</section>

	<section id="moja-praca" class="mt-[100px] sm:mt-60 w-full px-5 mx-auto scroll-mt-[70px]">
		<h2
			class="w-full max-w-[420px] md:max-w-[800px] xl:max-w-[1100px] mx-auto block text-3xl text-gray-100 mb-8"
		>
			Moja práca
		</h2>

		<div
			class="w-full max-w-[420px] md:max-w-[800px] xl:max-w-[1100px] mx-auto md:grid grid-cols-[1fr_10%_1fr] grid-rows-[1fr_1fr] gap-x-10 xl:gap-x-16 gap-y-12 xl:gap-y-20"
		>
			<div
				v-for="logo in logos"
				:key="logo.title"
				class="[&:not(&:first-child)]:mt-14 md:!mt-0"
				:class="[logo.span]"
			>
				<img
					:src="`/logos/${logo.id}.png`"
					:alt="`${logo.title} logo`"
					class="w-full rounded-lg border border-gray-400"
					loading="lazy"
				/>

				<div class="w-full flex items-center justify-between mt-5">
					<h3 class="text-2xl text-gray-100">{{ logo.title }}</h3>
					<NuxtLink
						:href="`/${logo.id}`"
						class="see-more text-gray-200 text-sm font-medium flex items-center border border-dark-100 rounded-md sm:px-5 sm:py-2 sm:hover:bg-dark-300 sm:hover:border-gray-400 sm:hover:text-theme transition-all"
					>
						Vidieť viac
						<IconsArrow
							class="w-5 h-5 ml-2 transition-all sm:group-hover:translate-x-[.5rem]"
						></IconsArrow>
					</NuxtLink>
				</div>
				<p class="w-full mt-5 text-gray-200">{{ logo.description }}</p>
			</div>
		</div>
	</section>

	<Testimonials />
</template>

<style scoped lang="postcss">
.see-more:hover svg {
	@apply translate-x-1;
}
</style>
