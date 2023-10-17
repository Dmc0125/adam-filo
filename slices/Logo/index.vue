<script setup lang="ts">
import { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.LogoSlice>(['slice', 'index', 'slices', 'context']));
</script>

<template>
	<section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
		Placeholder component for logo (variation: {{ slice.variation }}) Slices
	</section>
</template>
