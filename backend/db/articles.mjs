import { query } from './db-functions.mjs';

export async function getArticleById(id) {
	const articles = await query(
		`
    SELECT
        articles.id, 
        articles.type, 
        articles.short_name, 
        articles.full_name, 
        articles.price, 
        articles.code, 
        companies.id as company_id, 
        companies.name as company_name
    FROM 
        articles
    LEFT JOIN 
        companies ON articles.company_id = companies.id
    WHERE 
        articles.code = ?
    `,
		[id]
	);

	const articleRAW = articles[0];
	if (!articleRAW) {
		return null;
	}

	const { id: article_id, type, short_name, full_name, price, code, company_id, company_name } = articleRAW;

	const article = {
		id: article_id,
		type,
		short_name,
		full_name,
		price: price,
		code,
		company: {
			id: company_id,
			name: company_name,
		},
	};

	return article;
}
