<script setup lang="ts">
type Stat = {
	data: string;
	name: string;
};
const stats: Stat[] = [
	{ data: '173', name: 'Zákaziek' },
	{ data: '100%', name: 'Zákazníkov doporučuje' },
	{ data: '100%', name: 'Kvalita komunikácie' },
];

const { data } = await useFetch('/api/products');
</script>

<template>
	<section id="domov" class="px-5 mt-20">
		<h1 class="text-gray-100 text-3xl">Vylepšite svoj imidž a urobte pôsobivý prvý dojem</h1>
		<h2 class="font-[Inter] text-gray-200 text-base mt-5">
			Volám sa Adam, som profesionálny grafický dizajnér, najmä dizajnér loga s 3 rokmi skúseností
			na voľnej nohe.
		</h2>
		<div class="flex flex-col gap-y-5 mt-8 font-medium">
			<NuxtLink
				href="/kontakt"
				class="w-full bg-theme text-dark-100 h-14 rounded-md text-xl flex items-center justify-center"
				>Kontaktuje ma</NuxtLink
			>
			<NuxtLink
				href="/#moja-praca"
				class="w-full bg-dark-200 text-gray-100 h-14 rounded-md text-xl flex items-center justify-center"
				>Moja práca</NuxtLink
			>
		</div>
	</section>

	<section id="o-mne" class="mt-40 px-5 grid">
		<h2 class="text-gray-100 text-3xl mb-4">O mne</h2>

		<img
			src="/portrait.png"
			alt="Portrét"
			class="rounded-md border border-gray-400"
			loading="lazy"
		/>

		<p class="mt-8 text-gray-200 text-base">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>

		<ul class="mt-12 flex flex-col gap-y-5">
			<li v-for="stat in stats" :key="stat.name">
				<h6 class="text-theme font-[Inter] font-semibold text-3xl">{{ stat.data }}</h6>
				<p class="text-gray-100">{{ stat.name }}</p>
			</li>
		</ul>
	</section>

	<section id="cennik" class="mt-[100px] px-5">
		<h2 class="text-3xl text-gray-100">Cenník</h2>
		<p class="text-base text-gray-200 mt-4">
			Rád Vám pomôžem vytvoriť unikátne, moderné a profesionálne logo, keďže proces tvorby loga je o
			spolupráci. Logá dodávam vo všetkých formátoch, ktoré budete potrebovať.
		</p>

		<NuxtLink
			href="/kontakt"
			class="mt-5 block w-full h-10 bg-theme rounded-md flex items-center justify-center"
			>Poslať mail</NuxtLink
		>
		<span class="text-gray-300 text-sm my-5 block w-full text-center"
			>alebo si hneď vyberte balík</span
		>

		<section class="flex flex-col gap-y-16">
			<div
				v-for="product in data"
				:key="product.name"
				class="px-5 py-8 border border-gray-400 rounded-lg relative"
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
				<p class="text-base text-gray-200" v-html="product.description"></p>

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
					class="w-full h-10 flex items-center justify-center font-medium text-gray-100 bg-dark-200 rounded-md mt-8"
					:class="{ 'bg-theme text-dark-100': product.mostPopular }"
				>
					Vybrať
				</button>
			</div>
		</section>
	</section>
</template>
