<script lang="ts" setup>
type Props = {
	path: string;
	animate?: boolean;
};
const props = defineProps<Props>();

const el = ref<HTMLElement>();
function setRef(_el: HTMLElement) {
	el.value = _el;
}

const isShown = ref(false);

onMounted(() => {
	const observer = new IntersectionObserver((entries, _) => {
		const entry = entries[0];

		if (entry.isIntersecting) {
			activePath.value = props.path;
			if (!isShown.value) {
				isShown.value = true;
			}
		}
	});
	if (el.value) {
		observer.observe(el.value);
	}
});
</script>

<template>
	<slot
		:set-ref="setRef"
		:class-name="{
			'opacity-0': animate && !isShown,
			'opacity-100': animate && isShown,
			'transition-all duration-1000': animate,
		}"
	></slot>
</template>
