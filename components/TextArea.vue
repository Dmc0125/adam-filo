<script lang="ts" setup>
type Props = {
	id: string;
	label: string;
	minLen: number;
	maxLen: number;
	rows: number;
	modelValue: string;
};
defineProps<Props>();

type Emits = {
	(e: 'update:modelValue', v: string): void;
};
const emit = defineEmits<Emits>();

function emitInput(e: Event) {
	const t = e.currentTarget as HTMLInputElement;
	emit('update:modelValue', t.value);
}
</script>

<template>
	<div class="flex flex-col gap-y-2">
		<label :for="id">{{ label }}</label>
		<textarea
			:id="id"
			:minlength="minLen"
			:maxlength="maxLen"
			:name="id"
			class="py-2 min-h-[150px] bg-dark-300 border border-gray-400 text-gray-100 rounded-md px-4"
			:rows="rows"
			required
			:value="modelValue"
			@input="emitInput"
		></textarea>
	</div>
</template>
