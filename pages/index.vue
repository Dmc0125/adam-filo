<script setup lang="ts">
import { z } from 'zod';
import {
	Testimonial,
	compsLabelsSchema,
	logoSchema,
	productCompsSchema,
	testimonialSchema,
} from '~/utils/schemas';

type Product = {
	description: string;
	mostPopular: boolean;
	name: string;
	price: string;
	comps: Omit<z.infer<typeof productCompsSchema>, 'stripeId'>;
};

const { data, error } = await useAsyncData('content', async () => {
	const storyblok = useStoryblokApi();

	const [stories, stripeProducts] = await Promise.all([
		storyblok.getStories({ token: process.env.STORYBLOK_ACCESS_TOKEN }),
		$fetch('/api/products'),
	]);

	let labels = {} as z.infer<typeof compsLabelsSchema>;
	const logos: z.infer<typeof logoSchema>[] = [];
	const productsComps: Record<string, Omit<z.infer<typeof productCompsSchema>, 'stripeId'>> = {};
	const testimonials: Testimonial[] = [];

	for (const story of stories.data.stories) {
		if (story.full_slug === 'products-comps-labels') {
			const parseResult = compsLabelsSchema.safeParse(story.content);

			if (!parseResult.success) {
				return null;
			}

			labels = parseResult.data;
		} else if (story.full_slug.startsWith('logos/')) {
			const result = logoSchema.safeParse(story.content);
			if (!result.success) {
				return null;
			}
			logos.push(result.data);
		} else if (story.full_slug.startsWith('products-comps/')) {
			const result = productCompsSchema.safeParse(story.content);
			if (!result.success) {
				return null;
			}
			productsComps[result.data.stripeId] = result.data;
		} else if (story.full_slug.startsWith('testimonials')) {
			const result = testimonialSchema.safeParse(story.content);
			if (!result.success) {
				return null;
			}
			testimonials.push(result.data);
		}
	}

	const products: Product[] = [];

	for (const product of stripeProducts) {
		const comps = productsComps[product.id];
		products.push({
			...product,
			comps,
		});
	}

	return { labels, logos, products, testimonials };
});

if (error.value || !data.value) {
	throw createError({
		statusCode: 500,
		statusMessage: 'Unknown server error. Please try again later',
	});
}

useSeoMeta({
	title: 'Adam Filo',
});

useServerSeoMeta({
	ogTitle: 'Adam Filo',
	description: 'Vylepšite svoj imidž a urobte pôsobivý prvý dojem',
	ogDescription: 'Vylepšite svoj imidž a urobte pôsobivý prvý dojem',
	ogSiteName: 'Adam Filo',
	ogType: 'website',
	ogUrl: '',
	ogImage: '',
	themeColor: '#FF8125',
	ogLocale: 'sk_SK',
	twitterCard: 'summary_large_image',
	twitterTitle: 'Adam Filo',
	twitterDescription: 'Vylepšite svoj imidž a urobte pôsobivý prvý dojem',
});

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

type LogoSize = 'lg' | 'sm';
type LogoPosition = 'left' | 'right';

function getLogoSpan(size: LogoSize, position: LogoPosition): string {
	if (size === 'lg' && position === 'left') {
		return '1/3';
	} else if (size === 'lg' && position === 'right') {
		return '2/4';
	} else if (size === 'sm' && position === 'left') {
		return '1/2';
	}
	return '3/4';
}
</script>

<template>
	<NavItem v-slot="{ setRef }" path="/">
		<section
			id="domov"
			:ref="(el) => setRef(el as HTMLElement)"
			class="mt-[25vh] w-full max-w-[420px] sm:max-w-[1100px] px-5 xl:px-0 mx-auto"
		>
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
					class="w-full sm:w-[200px] md:w-[290px] h-14 bg-dark-300 text-gray-100 border border-gray-400 rounded-md text-xl flex items-center justify-center"
					>Moja práca</NuxtLink
				>
			</div>
		</section>
	</NavItem>

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

	<NavItem v-slot="{ setRef, className }" path="/#cennik" :animate="true">
		<section
			id="cennik"
			:ref="(el) => setRef(el as HTMLElement)"
			class="mt-[100px] sm:mt-60 w-full max-w-[420px] sm:max-w-[660px] lg:max-w-[1100px] px-5 md:px-0 lg:px-5 xl:px-0 mx-auto scroll-mt-[70px]"
			:class="className"
		>
			<h2 class="text-3xl text-gray-100">Cenník</h2>
			<p class="text-base text-gray-200 mt-4">
				Rád Vám pomôžem vytvoriť unikátne, moderné a profesionálne logo, keďže proces tvorby loga je
				o spolupráci. Logá dodávam vo všetkých formátoch, ktoré budete potrebovať.
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
					v-for="product in data!.products"
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
					<p class="text-3xl font-bold text-gray-100">{{ product.price }} €</p>
					<p class="text-xs text-gray-300 font-semibold mb-2">s DPH</p>
					<p class="text-base text-gray-200">{{ product.description }}</p>

					<div class="h-full"></div>

					<ul class="mt-10 flex flex-col gap-y-3">
						<li
							v-for="(label, labelKey) in data!.labels"
							:key="label"
							class="flex items-center justify-between text-gray-200"
						>
							<p>{{ label }}</p>
							<IconsCheckmark
								v-if="typeof product.comps[labelKey] === 'boolean' && product.comps[labelKey]"
								class="w-6 h-6"
								:class="{ 'text-theme': product.mostPopular }"
							/>
							<IconsCloseCircle
								v-else-if="typeof product.comps[labelKey] === 'boolean' && !product.comps[labelKey]"
								class="w-6 h-6 text-gray-300"
							/>
							<p v-else class="min-w-[24px] text-center block">
								{{ product.comps[labelKey] }}
							</p>
						</li>
					</ul>

					<a
						class="w-full h-10 flex items-center justify-center font-medium rounded-md mt-8"
						:class="[product.mostPopular ? 'bg-theme text-dark-100' : 'text-gray-100 bg-dark-200']"
						href="https://www.stovkomat.cz/logo-design-7C-originalne-moderne-logo-ktore-zaujme/37308/?listPosition=1&listType=userDetail"
						target="_blank"
						rel="noopener noreferrer"
					>
						Navštíviť Stovkomat
					</a>
				</div>
			</section>
		</section>
	</NavItem>

	<NavItem v-slot="{ setRef, className }" path="/#moja-praca" :animate="true">
		<section
			id="moja-praca"
			:ref="(el) => setRef(el as HTMLElement)"
			class="mt-[100px] sm:mt-60 w-full px-5 mx-auto scroll-mt-[70px]"
			:class="className"
		>
			<h2
				class="w-full max-w-[420px] md:max-w-[800px] xl:max-w-[1100px] mx-auto block text-3xl text-gray-100 mb-8"
			>
				Moja práca
			</h2>

			<div
				class="w-full max-w-[420px] md:max-w-[800px] xl:max-w-[1100px] mx-auto md:grid grid-cols-[1fr_10%_1fr] grid-rows-[1fr_1fr] gap-x-10 xl:gap-x-16 gap-y-12 xl:gap-y-20"
			>
				<div
					v-for="logo in data!.logos"
					:key="logo.slug"
					class="[&:not(&:first-child)]:mt-14 md:!mt-0"
					:style="{ 'grid-column': getLogoSpan(logo.size, logo.position) }"
				>
					<img
						:src="logo.img.filename"
						:alt="logo.imgAlt"
						class="w-full rounded-lg border border-gray-400"
						loading="lazy"
					/>

					<div class="w-full flex items-center justify-between mt-5">
						<h3 class="text-2xl text-gray-100">{{ logo.name }}</h3>
						<NuxtLink
							:href="`/${logo.slug}`"
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
	</NavItem>

	<Testimonials :testimonials="data!.testimonials" />
</template>

<style scoped lang="postcss">
.see-more:hover svg {
	@apply translate-x-1;
}
</style>
