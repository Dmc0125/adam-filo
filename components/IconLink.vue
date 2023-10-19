<script lang="ts" setup>
type Props = {
	url: string;
};
defineProps<Props>();
</script>

<template>
	<a
		:href="url"
		target="_blank"
		rel="noopener noreferrer"
		class="block relative p-1 rounded-md [&:hover_svg]:[filter:invert(100%)] [&:hover_div]:opacity-100 [&:hover_div]:scale-x-100"
	>
		<div
			class="inset-0 absolute bg-theme opacity-0 rounded-md scale-x-0 origin-left transition-all"
		></div>
		<slot class="absolute inset-0 p-1 h-full aspect-square transition-all"></slot>
	</a>
</template>
