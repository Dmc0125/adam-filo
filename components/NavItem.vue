<script lang="ts" setup>
type Props = {
	path: string;
};
const props = defineProps<Props>();

const el = ref<HTMLElement>();
function setRef(_el: HTMLElement) {
	el.value = _el;
}

onMounted(() => {
	const observer = new IntersectionObserver((entries, _) => {
		const entry = entries[0];

		if (entry.isIntersecting) {
			activePath.value = props.path;
		}
	});
	if (el.value) {
		observer.observe(el.value);
	}
});
</script>

<template>
	<slot :set-ref="setRef"></slot>
</template>
