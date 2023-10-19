import Stripe from 'stripe';

type ProductResponseData = {
	mostPopular: boolean;
	id: string;
	name: string;
	description: string;
	price: string;
};

export default defineEventHandler(async (_): Promise<ProductResponseData[]> => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
		apiVersion: '2023-10-16',
	});

	const [products, prices] = await Promise.all([stripe.products.list(), stripe.prices.list()]);
	const parsed: ProductResponseData[] = [];

	products.data.forEach(({ id, description, name, default_price, metadata }) => {
		const price = prices.data.find(({ id: priceId }) => priceId === default_price);
		if (price) {
			const p = Number(price.unit_amount) / 100;

			if (metadata.position) {
				parsed[Number(metadata.position)] = {
					mostPopular: metadata.mostPopular === 'true',
					price: p.toFixed(2),
					id,
					description: description!,
					name,
				};
			} else {
				parsed.push({
					mostPopular: metadata.mostPopular === 'true',
					price: p.toFixed(2),
					id,
					description: description!,
					name,
				});
			}
		}
	});
	return parsed;
});
