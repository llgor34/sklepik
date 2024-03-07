import { query } from './db-functions.mjs';

export async function getArticleByCode(productCode) {
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
        [productCode]
    );

    const articleRAW = articles[0];
    if (!articleRAW) {
        return null;
    }

    const { id, type, short_name, full_name, price, code, company_id, company_name } = articleRAW;

    const articleOptionsRAW = await query(
        `
	SELECT 
		products_category_connection.id AS category_connection_id,
		products_options.name,
        products_options.id,
        products_category.id AS category_id,
		products_category.name AS category_name 
	FROM
		products_category_connection 
	INNER JOIN 
		products_category ON products_category_connection.category_id = products_category.id 
	INNER JOIN 
		products_options ON products_category.id = products_options.category_id 
	WHERE 
		product_id = ?;
	`,
        [id]
    );

    let articleOptions = [];
    articleOptionsRAW.forEach((articleOption) => {
        const existingOptionIdx = articleOptions
            .map((option) => option.id)
            .indexOf(articleOption.category_connection_id);
        if (existingOptionIdx === -1) {
            articleOptions.push({
                id: articleOption.category_connection_id,
                category_id: articleOption.category_id,
                category_name: articleOption.category_name,
                options: [{ id: articleOption.id, name: articleOption.name }],
            });
            return;
        }

        articleOptions[existingOptionIdx].options.push({ id: articleOption.id, name: articleOption.name });
    });

    articleOptions = articleOptions.map((option) => ({ ...option, id: undefined }));

    const article = {
        id,
        type,
        short_name,
        full_name,
        price: price,
        code,
        company: {
            id: company_id,
            name: company_name,
        },
        product_category_options: articleOptions,
    };

    return article;
}
