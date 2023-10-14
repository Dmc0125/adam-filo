<script lang="ts" setup>
type Props = {
	isOpen: boolean;
};
defineProps<Props>();

type Emits = {
	(e: 'close'): void;
};
defineEmits<Emits>();

const route = useRoute();
</script>

<template>
	<div v-if="isOpen" class="fixed inset-0 bg-dark-100">
		<button class="w-10 h-10 absolute top-8 right-5 text-gray-200 p-1" @click="$emit('close')">
			<IconsClose></IconsClose>
		</button>

		<nav class="absolute top-1/2 -translate-y-1/2 ml-[15%]">
			<ul class="flex flex-col gap-y-10">
				<li v-for="link in links" :key="link.url">
					<NuxtLink
						:href="link.url"
						style="font-family: 'DM Serif Display'"
						class="text-gray-100 text-3xl"
						:class="{ 'text-theme': route.fullPath == link.url }"
						>{{ link.name }}</NuxtLink
					>
				</li>
			</ul>
			<ul class="mt-10 flex items-center gap-x-10 text-gray-100">
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
		</nav>
	</div>
</template>
