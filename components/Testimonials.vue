<script lang="ts" setup>
type Testimonial = {
	credentials: string;
	name: string;
	content: string;
	picture?: string;
};

const { data } = await useAsyncData('testimonials', () => queryContent('testimonials').find());

function intoChunks(all: Testimonial[], chunkSize = 3): Testimonial[][] {
	const chunks: Testimonial[][] = [];

	for (let i = 0; i < all.length; i += chunkSize) {
		chunks.push(all.slice(i, i + chunkSize));
	}

	return chunks;
}

const chunksOfThree = data.value ? intoChunks(data.value[0].body as unknown as Testimonial[]) : [];
const chunksOfTwo = data.value ? intoChunks(data.value[0].body as unknown as Testimonial[], 2) : [];

const activeSlide = ref(1);
const wrapperRef = ref<HTMLElement | undefined>();
const wrapperWidth = ref(0);

function handleResize(_: UIEvent) {
	wrapperWidth.value = wrapperRef.value!.clientWidth - 1;
}

onMounted(() => {
	wrapperWidth.value = wrapperRef.value!.clientWidth - 1;
	window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
	window.removeEventListener('resize', handleResize);
});
</script>

<template>
	<NavItem v-slot="{ setRef, className }" path="/#hodnotenia" :animate="true">
		<section
			id="hodnotenia"
			:ref="(el) => setRef(el as HTMLElement)"
			class="max-w-[420px] md:max-w-full sm:px-0 md:px-5 mx-auto w-full mt-[100px] sm:mt-60 scroll-mt-[70px]"
			:class="className"
		>
			<div
				v-if="data"
				ref="wrapperRef"
				class="max-w-[calc(100vw-40px)] md:max-w-[800px] md:w-full mx-auto xl:max-w-[1100px]"
			>
				<h2 class="text-3xl text-gray-100 mb-8">Hodnotenia</h2>

				<div class="h-fit md:hidden w-full">
					<div
						class="flex gap-x-10 transition-all"
						:style="{
							transform: `translateX(-${(wrapperWidth + 40 || 0) * (activeSlide - 1)}px)`,
						}"
					>
						<div
							v-for="(chunk, i) in chunksOfThree"
							:key="i"
							class="flex flex-col flex-shrink-0 gap-y-10 max-w-[420px] w-[calc(100vw-40px)]"
						>
							<Testimonial
								v-for="(testimonial, j) in chunk"
								:key="j"
								:name="testimonial.name"
								:picture="testimonial.picture"
								:content="testimonial.content"
								:credentials="testimonial.credentials"
							/>
						</div>
					</div>
				</div>

				<div class="flex items-center gap-x-6 mt-8 mx-auto w-fit md:hidden">
					<button
						v-for="i in 2"
						:key="i"
						class="w-4 h-4 rounded-full"
						:class="[i == activeSlide ? 'bg-theme' : 'bg-dark-200']"
						:aria-label="`slide ${i}`"
						@click="activeSlide = i"
					></button>
				</div>

				<div class="hidden w-full md:flex gap-x-10 xl:hidden">
					<div v-for="(chunk, i) in chunksOfThree" :key="i" class="w-full flex flex-col gap-y-8">
						<Testimonial
							v-for="(testimonial, j) in chunk"
							:key="j"
							:name="testimonial.name"
							:picture="testimonial.picture"
							:content="testimonial.content"
							:credentials="testimonial.credentials"
						/>
					</div>
				</div>

				<div class="hidden xl:flex gap-x-16">
					<div v-for="(chunk, i) in chunksOfTwo" :key="i" class="w-full flex flex-col gap-y-8">
						<Testimonial
							v-for="(testimonial, j) in chunk"
							:key="j"
							:name="testimonial.name"
							:picture="testimonial.picture"
							:content="testimonial.content"
							:credentials="testimonial.credentials"
						/>
					</div>
				</div>
			</div>
		</section>
	</NavItem>
</template>
