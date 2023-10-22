import { z } from 'zod';

export const compsLabelsSchema = z.object({
	designs: z.string().min(1),
	revisions: z.string().min(1),
	mockup: z.string().min(1),
	highResolution: z.string().min(1),
	sourceData: z.string().min(1),
	fbProfilePic: z.string().min(1),
	deliveryTime: z.string().min(1),
});

export const logoSchema = z.object({
	name: z.string().min(1),
	size: z.enum(['sm', 'lg']),
	position: z.enum(['left', 'right']),
	imgAlt: z.string().min(1),
	img: z.object({
		filename: z.string().url(),
	}),
	slug: z.string().min(1),
	description: z.string().min(1),
});

export const productCompsSchema = z.object({
	stripeId: z.string().min(1),
	designs: z
		.string()
		.min(1)
		.transform((x) => Number(x)),
	revisions: z
		.string()
		.min(1)
		.transform((x) => Number(x)),
	mockup: z.boolean(),
	highResolution: z.boolean(),
	sourceData: z.boolean(),
	fbProfilePic: z.boolean(),
	deliveryTime: z.string().min(1),
});

export const testimonialSchema = z.object({
	name: z.string().min(1),
	content: z.string().min(1),
	credentials: z.string().min(1),
	picture: z.string().optional(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

export const workStatSchema = z.object({
	value: z.string().min(1),
	name: z.string().min(1),
});
