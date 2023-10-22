import Mail from '@/components/icons/Mail.vue';
import Instagram from '@/components/icons/Instagram.vue';

export type Link = {
	name: string;
	url: string;
};

export const links: Link[] = [
	{
		name: 'Domov',
		url: '/',
	},
	{
		name: 'Kontakt',
		url: '/contact',
	},
	{
		name: 'Cenník',
		url: '/#pricing',
	},
	{
		name: 'Moja práca',
		url: '/#my-work',
	},
	{
		name: 'Hodnotenia',
		url: '/#testimonials',
	},
];

export const activePath = ref('/');

export type Social = {
	url: string;
	icon: typeof Mail;
};

export const socials: Social[] = [
	{ url: 'mailto:kontakt@adamfilo.com', icon: Mail },
	{ url: 'https://instagram.com/adam_filo_', icon: Instagram },
];
