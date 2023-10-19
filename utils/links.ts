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
		url: '/#cennik',
	},
	{
		name: 'Moja práca',
		url: '/#moja-praca',
	},
	{
		name: 'Hodnotenia',
		url: '/#hodnotenia',
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
