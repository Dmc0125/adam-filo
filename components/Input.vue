<script lang="ts" setup>
type Props = {
	id: string;
	label: string;
	minLen: number;
	maxLen: number;
	type: 'text' | 'email' | 'password';
	modelValue: string;
	error?: string;
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
	<div class="relative flex flex-col gap-y-2">
		<label :for="id">{{ label }}</label>
		<input
			:id="id"
			:minlength="minLen"
			:maxlength="maxLen"
			:type="type"
			:name="id"
			class="h-10 bg-dark-300 border text-gray-100 rounded-md px-4"
			:class="[error?.length ? 'border-error' : 'border-gray-400']"
			required
			:value="modelValue"
			@input="emitInput"
		/>
		<p
			v-if="error?.length"
			class="absolute text-error text-sm font-medium bottom-0 translate-y-full"
		>
			{{ error }}
		</p>
	</div>
</template>
