<script lang="ts" setup>
type Props = {
	isOpen: boolean;
	isScrolled: boolean;
};
defineProps<Props>();

type Emits = {
	(e: 'close'): void;
};
defineEmits<Emits>();

const route = useRoute();
</script>

<template>
	<Transition name="menu">
		<div v-if="isOpen" class="fixed z-50 inset-0 bg-dark-100 overflow-auto">
			<div
				class="w-full h-[100px] flex items-center justify-end pr-5 xl:pr-[clamp(1.25rem,10%,100px)]"
				:class="{ 'h-[70px]': isScrolled }"
			>
				<button class="w-10 h-10 text-gray-200 p-1" @click="$emit('close')">
					<IconsClose></IconsClose>
				</button>
			</div>

			<nav
				class="w-1/2 absolute top-1/2 -translate-y-1/2 ml-[15%] lg:ml-[25%] overflow-y-auto"
				@click="$emit('close')"
			>
				<TransitionGroup
					appear
					tag="ul"
					name="links"
					class="w-full flex flex-col gap-y-5 xl:gap-y-16"
				>
					<li
						v-for="(link, i) in links"
						:key="link.url"
						class="w-full"
						:style="{ 'transition-delay': `${(i + 1) * 150}ms` }"
					>
						<NuxtLink
							:href="link.url"
							style="font-family: 'DM Serif Display'"
							class="link w-full text-gray-100 text-3xl lg:text-4xl xl:text-6xl hover:text-theme flex items-center justify-between"
							:class="{ 'text-theme': route.fullPath == link.url }"
							>{{ link.name }}
							<IconsArrow
								class="hidden sm:block h-10 lg:h-14 xl:h-16 aspect-square opacity-0 text-dark-100 transition-all -translate-x-2"
							></IconsArrow>
						</NuxtLink>
					</li>
				</TransitionGroup>
				<Transition appear name="links">
					<ul
						class="mt-10 lg:mt-12 xl:mt-16 flex items-center gap-x-10 text-gray-100"
						:style="{ 'transition-delay': `${links.length * 150}ms` }"
					>
						<li>
							<a
								href="https://instagram.com/adamfilo"
								target="_blank"
								rel="noopener noreferrer"
								class="w-12 h-12 p-1 block"
							>
								<IconsMail class="w-full h-full"></IconsMail>
							</a>
						</li>
						<li>
							<a
								href="mailto:kontakt@adamfilo.com"
								target="_blank"
								rel="noopener noreferrer"
								class="w-12 h-12 p-1 block"
							>
								<IconsInstagram class="w-full h-full"></IconsInstagram>
							</a>
						</li>
					</ul>
				</Transition>
			</nav>
		</div>
	</Transition>
</template>

<style scoped lang="postcss">
.link:hover svg {
	@apply text-theme opacity-100 translate-x-0;
}

.menu-enter-active,
.menu-leave-active {
	@apply transition-opacity;
}

.menu-enter-from,
.menu-leave-to {
	@apply opacity-0;
}

.menu-enter-to,
.menu-leave-from {
	@apply opacity-100;
}

.links-enter-active {
	@apply transition-opacity;
}

.links-enter-from {
	@apply opacity-0;
}

.links-enter-to {
	@apply opacity-100;
}
</style>
