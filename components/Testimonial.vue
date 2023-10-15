<script lang="ts" setup>
type Props = {
	picture?: string;
	name: string;
	credentials: string;
	content: string;
};
defineProps<Props>();
</script>

<template>
	<div class="w-full p-5 border border-gray-400 bg-dark-300 rounded-lg">
		<header class="w-full flex items-center">
			<img
				v-if="picture"
				class="w-14 h-14 rounded-full"
				:src="picture"
				:alt="credentials"
				loading="lazy"
			/>
			<div v-else class="w-14 h-14 rounded-full bg-green flex items-center justify-center">
				{{ credentials }}
			</div>

			<div class="flex flex-col ml-8">
				<h4 class="font-[Inter] text-md text-gray-200 font-semibold">
					{{ name }}
				</h4>
				<div class="flex">
					<IconsStar class="text-star w-6 h-6" />
					<IconsStar class="text-star w-6 h-6" />
					<IconsStar class="text-star w-6 h-6" />
					<IconsStar class="text-star w-6 h-6" />
					<IconsStar class="text-star w-6 h-6" />
				</div>
			</div>
		</header>

		<p class="mt-5 text-gray-100">
			{{ content }}
		</p>
	</div>
</template>
