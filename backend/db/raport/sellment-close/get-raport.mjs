import { query } from '../../db-functions.mjs';
import Decimal from 'decimal.js';

export async function getRaport(raportId) {
	let products = null;
	let paymentMethodsTotal = null;

	// TODO: remove duplication
	if (raportId) {
		const result = await query(`SELECT * FROM sellment_close WHERE id = ${raportId}`);
		const raport = result[0];

		products = await query(
			`
		SELECT articles.short_name, articles.type, articles.code, SUM(articles_sellment.amount) as amount, articles_sellment.price
		FROM articles_sellment
		INNER JOIN articles ON articles_sellment.article_id = articles.id
		INNER JOIN orders ON articles_sellment.order_id = orders.id
		WHERE orders.id > ? AND orders.id < ?
		GROUP BY articles.id, articles_sellment.price
		ORDER BY articles.short_name, articles.type`,
			[raport.starting_order_id - 1, raport.ending_order_id + 1]
		);

		paymentMethodsTotal = await query(
			`
		SELECT orders.payment_method_id, SUM(articles.price * articles_sellment.amount) AS sum
		FROM articles_sellment 
		INNER JOIN articles ON articles.id = articles_sellment.article_id
		INNER JOIN orders ON articles_sellment.order_id = orders.id
		WHERE orders.id > ? AND orders.id < ?
		GROUP BY orders.payment_method_id;
		`,
			[raport.starting_order_id - 1, raport.ending_order_id + 1]
		);
	} else {
		const result = await query('SELECT * FROM sellment_close ORDER BY id DESC LIMIT 1');
		const raport = result[0];

		products = await query(
			`
		SELECT articles.short_name, articles.type, articles.code, SUM(articles_sellment.amount) as amount, articles_sellment.price
		FROM articles_sellment
		INNER JOIN articles ON articles_sellment.article_id = articles.id
		INNER JOIN orders ON articles_sellment.order_id = orders.id
		WHERE orders.id > ?
		GROUP BY articles.id, articles_sellment.price
		ORDER BY articles.short_name, articles.type`,
			[raport?.ending_order_id ?? 1]
		);

		paymentMethodsTotal = await query(
			`
		SELECT orders.payment_method_id, SUM(articles.price * articles_sellment.amount) AS sum
		FROM articles_sellment 
		INNER JOIN articles ON articles.id = articles_sellment.article_id
		INNER JOIN orders ON articles_sellment.order_id = orders.id
		WHERE orders.id > ?
		GROUP BY orders.payment_method_id;
		`,
			[raport?.ending_order_id ?? 1]
		);
	}

	products = alterDataStructure(products);
	const sortedProducts = getSortedProducts(products);

	const { article, product, discount, promotion } = sortedProducts;
	const totalPrice = Decimal.add(article.totalPrice, product.totalPrice);
	const totalPriceWithDiscounts = Decimal.add(Decimal.add(totalPrice, discount.totalPrice), promotion.totalPrice);

	let totalCashPrice = Decimal(paymentMethodsTotal.filter(el => el.payment_method_id == 1)[0]?.sum || 0).toNumber();
	let totalNonCashPrice = Decimal(paymentMethodsTotal.filter(el => el.payment_method_id == 2)[0]?.sum || 0).toNumber();

	return { totalPrice, totalPriceWithDiscounts, totalCashPrice, totalNonCashPrice, products: sortedProducts };
}

function alterDataStructure(products) {
	return products.map(product => ({
		...product,
		price: Decimal(product.price).toNumber(),
		totalPrice: Decimal.mul(Decimal(product.price).toNumber(), +product.amount),
		amount: +product.amount,
	}));
}

function getSortedProducts(products) {
	const sortedProducts = {
		article: initProductData('Łącznie towarów'),
		product: initProductData('Łącznie produktów'),
		discount: initProductData('Łącznie promocji'),
		promotion: initProductData('Łącznie rabatów'),
	};

	for (const product of products) {
		const sortedProductTypeProduct = sortedProducts[product.type];

		sortedProductTypeProduct.products.push(product);
		sortedProductTypeProduct.totalPrice = Decimal.add(sortedProductTypeProduct.totalPrice, product.totalPrice);
	}

	return sortedProducts;
}

function initProductData(label) {
	return {
		totalPriceLabel: label,
		totalPrice: 0,
		products: [],
	};
}
