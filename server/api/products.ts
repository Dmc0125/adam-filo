type ProductPrice = {
	currency: string;
	price: number;
	discountedPrice: number;
	formatted: {
		price: string;
		discountedPrice: string;
	};
};

type ProductData = {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: ProductPrice;
	priceData: ProductPrice;
	convertedPriceData: ProductPrice;
	additionalInfoSections: {
		title: string;
		description: string;
	}[];
	manageVariants: boolean;
	productPageUrl: {
		base: string;
		path: string;
	};
	numericId: string;
	inventoryItemId: string;
	discount: {
		type: string;
		value: number;
	};
	collectionIds: string[];
	lastUpdated: string;
};

const comparisons: Record<string, [string, number | boolean | string][]> = {
	základ: [
		['Počet návrhov', 2],
		['Počet revízií', 3],
		['Vysoké rozlíšenie', true],
		['3D Mockup', true],
		['Zdrojové dáta', false],
		['FB Profilovka', false],
		['Dĺžka dodania', '3 dni'],
	],
	standard: [
		['Počet návrhov', 3],
		['Počet revízií', 4],
		['Vysoké rozlíšenie', true],
		['3D Mockup', true],
		['Zdrojové dáta', true],
		['FB Profilovka', false],
		['Dĺžka dodania', '4 dni'],
	],
	premium: [
		['Počet návrhov', 4],
		['Počet revízií', 100],
		['Vysoké rozlíšenie', true],
		['3D Mockup', true],
		['Zdrojové dáta', true],
		['FB Profilovka', true],
		['Dĺžka dodania', '5 dní'],
	],
};

type ProductResponseData = {
	mostPopular: boolean;
	id: string;
	name: string;
	description: string;
	price: string;
	comparisons: [string, number | boolean | string][];
};

export default defineEventHandler(async (_): Promise<ProductResponseData[]> => {
	try {
		const res = await fetch('https://www.wixapis.com/stores/v1/products/query', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: process.env.WIX_API_KEY as string,
				'wix-site-id': process.env.WIX_SITE_ID as string,
			},
		});
		if (!res.ok) {
			console.log(res);
			try {
				console.log(await res.json());
			} catch (_) {}
			throw createError({
				statusCode: 500,
				statusMessage: 'Unknown server error',
			});
		}

		const data: { products: ProductData[] } = await res.json();
		const responseData: ProductResponseData[] = [];

		for (const key of ['základ', 'standard', 'premium']) {
			const p = data.products.find(({ slug }) => slug === key);

			if (p) {
				const comps = comparisons[p.slug];
				if (!comps) {
					continue;
				}
				const { id, name, description, price } = p;
				const desc = description.replace('<p><span>', '').replace('</span></p>', '');

				responseData.push({
					mostPopular: key === 'standard',
					description: desc,
					id,
					name,
					price: price.formatted.price,
					comparisons: comps,
				});
			}
		}

		return responseData;
	} catch (error) {
		console.log(error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Unknown server error',
		});
	}
});
