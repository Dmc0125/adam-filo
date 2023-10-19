<script lang="ts" setup>
import emailjs from '@emailjs/browser';

useSeoMeta({
	title: 'Adam Filo | Kontakt',
});

useServerSeoMeta({
	ogTitle: 'Adam Filo | Kontakt',
	description: 'Vylepšite svoj imidž a urobte pôsobivý prvý dojem',
	ogDescription: 'Vylepšite svoj imidž a urobte pôsobivý prvý dojem',
	ogSiteName: 'Adam Filo | Kontakt',
	ogType: 'website',
	ogUrl: '',
	ogImage: '',
	themeColor: '#FF8125',
	ogLocale: 'sk_SK',
	twitterCard: 'summary_large_image',
	twitterTitle: 'Adam Filo | Kontakt',
	twitterDescription: 'Vylepšite svoj imidž a urobte pôsobivý prvý dojem',
});

const runtimeConfig = useRuntimeConfig();

const name = ref('');
const nameError = ref('');
const surname = ref('');
const surnameError = ref('');
const email = ref('');
const emailError = ref('');
const message = ref('');
const messageError = ref('');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function validateMail() {
	let e = false;
	if (name.value.length < 2) {
		nameError.value = 'Meno je príliš krátke';
		e = true;
	}
	if (name.value.length > 20) {
		nameError.value = 'Meno je príliš dlhé';
		e = true;
	}

	if (surname.value.length < 2) {
		surnameError.value = 'Priezvisko je príliš krátke';
		e = true;
	}
	if (surname.value.length > 20) {
		surnameError.value = 'Priezvisko je príliš dlhé';
		e = true;
	}

	if (!emailRegex.test(email.value)) {
		emailError.value = 'Email je neplatný';
		e = true;
	}

	if (message.value.length < 10) {
		messageError.value = 'Správa je príliš krátka';
		e = true;
	}
	if (message.value.length > 500) {
		messageError.value = 'Správa je príliš dlhá';
		e = true;
	}

	return e;
}

const wasSuccessful = ref<null | boolean>(null);
const sending = ref(false);

async function sendMail() {
	nameError.value = '';
	surnameError.value = '';
	emailError.value = '';
	messageError.value = '';

	const e = validateMail();

	if (e) {
		return;
	}

	sending.value = true;
	const res = await emailjs.send(
		runtimeConfig.public.EMAILJS_SERVICE_ID,
		runtimeConfig.public.EMAILJS_TEMPLATE_ID,
		{
			name: 'test',
			surname: 'test',
			email: 'test@test123.com',
			message: 'tets message',
		},
		runtimeConfig.public.EMAILJS_PUBLIC_KEY,
	);

	name.value = '';
	surname.value = '';
	email.value = '';
	message.value = '';

	sending.value = false;
	wasSuccessful.value = res.status === 200;

	setTimeout(() => {
		wasSuccessful.value = null;
	}, 5000);
}
</script>

<template>
	<main
		class="w-full max-w-[420px] md:max-w-[1200px] mx-auto h-full pt-[20vh] grid md:grid-cols-[minmax(300px,500px),1fr,minmax(300px,500px)] md:justify-between gap-y-12 gap-x-10 px-5 xl:px-[clamp(1.25rem,10%,100px)]"
	>
		<section class="w-full flex flex-col gap-y-5">
			<h2 class="text-3xl md:text-4xl lg:text-5xl text-gray-100">Kontaktuje ma</h2>
			<p class="text-base text-gray-200">
				Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
				graphic or web designs. The passage is attributed to an unknown typesetter in the 15th
				century who is thought to have scrambled parts of Cicero's.
			</p>

			<dl>
				<ul class="flex flex-col gap-y-4">
					<li class="flex items-center gap-x-3">
						<IconsMail class="w-10 h-10 text-gray-200"></IconsMail>
						<a class="text-gray-100" href="mailto:kontakt@adamfilo.com">kontakt@adamfilo.com</a>
					</li>
					<li class="flex items-center gap-x-3">
						<IconsInstagram class="w-10 h-10 text-gray-200"></IconsInstagram>
						<a class="text-gray-100" href="https://instagram.com/adam_filo_">@adam_filo_</a>
					</li>
					<li class="flex items-center gap-x-3">
						<IconsPhone class="w-10 h-10 text-gray-200"></IconsPhone>
						<a class="text-gray-100" href="tel:+421123456789">+421 123 456 789</a>
					</li>
				</ul>
			</dl>
		</section>

		<form
			class="w-full flex flex-col gap-y-8 flex-shrink-0 justify-self-end md:col-[3/4]"
			@submit.prevent="sendMail()"
		>
			<div class="grid gap-y-8 md:grid-cols-2 gap-x-8">
				<Input
					id="name"
					v-model="name"
					label="Meno"
					:min-len="2"
					:max-len="20"
					type="text"
					:error="nameError"
				></Input>
				<Input
					id="surname"
					v-model="surname"
					label="Priezvisko"
					:min-len="2"
					:max-len="20"
					type="text"
					:error="surnameError"
				></Input>
			</div>

			<Input
				id="email"
				v-model="email"
				label="Email"
				:min-len="2"
				:max-len="100"
				type="email"
				:error="emailError"
			></Input>

			<TextArea
				id="message"
				v-model="message"
				label="Správa"
				:min-len="10"
				:max-len="500"
				:rows="5"
				:error="messageError"
			></TextArea>

			<button
				type="submit"
				class="w-full h-10 bg-theme text-dark-100 rounded-md flex items-center justify-center"
				:disabled="sending"
			>
				<span v-if="!sending"> Poslať mail </span>
				<div
					v-else
					class="h-4 w-4 rounded-full animate-spin border-2 border-dark-100 border-b-theme"
				></div>
			</button>

			<div
				v-if="wasSuccessful"
				class="w-full h-10 bg-green/20 text-green border border-green/50 font-medium text-base flex items-center justify-center rounded-md"
			>
				Email bol úspešne odoslaný
			</div>
			<div
				v-else-if="wasSuccessful === false"
				class="w-full h-10 bg-error/20 text-error border border-error/50 font-medium text-base flex items-center justify-center rounded-md"
			>
				Email sa nepodarilo odoslať
			</div>
		</form>
	</main>
</template>

<style scope lang="postcss">
label {
	@apply text-gray-200 text-base font-medium;
}

.input {
	@apply min-w-0 bg-dark-300 border border-gray-400 text-gray-100 rounded-md px-4;
}
</style>
