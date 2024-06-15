import { query, updateFieldQuery } from '../general/db-functions.mjs';

export async function getLatestArticleId() {
    const res = await query(`SELECT id FROM articles ORDER BY id DESC LIMIT 1`);
    return res[0].id;
}

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

    const article = await getArticleObj(articleRAW);
    return article;
}

export async function getArticles() {
    let articles = await query(
        `
    SELECT
        articles.id, 
        articles.type, 
        articles.short_name, 
        articles.full_name, 
        articles.price, 
        articles.code, 
        articles.stock_amount,
        companies.id as company_id, 
        companies.name as company_name
    FROM 
        articles
    LEFT JOIN 
        companies ON articles.company_id = companies.id
    `,
        []
    );

    articles = articles.map(getArticleObj);
    return await Promise.all(articles);
}

async function getArticleObj(article) {
    const { id, type, short_name, full_name, price, code, stock_amount, company_id, company_name } = article;

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

    return {
        id,
        type,
        short_name,
        full_name,
        price: price,
        code,
        stock_amount,
        company: {
            id: company_id,
            name: company_name,
        },
        product_category_options: articleOptions,
    };
}

export async function createArticle(price, code, type, short_name, full_name, comapanyId = null) {
    return await query(
        `INSERT INTO articles(id, price, code, type, short_name, full_name, company_id, stock_amount) VALUES (null, ?, ?, ?, ?, ?, ?, 0)`,
        [price, code, type, short_name, full_name, comapanyId]
    );
}

export async function updateArticle(articleId, fieldData) {
    await updateFieldQuery('articles', articleId, fieldData);
}

export async function deleteArticle(id) {
    return await query(`DELETE FROM articles WHERE id = ?`, [id]);
}

export async function updateArticlesStockAmount(articles) {
    const articlesId = articles.filter(toNotBePromotion).filter(toNotBeDiscount).map(toId);
    await query(`UPDATE articles SET stock_amount = stock_amount - 1 WHERE articles.id IN (${articlesId.join(',')})`);
}

function toNotBePromotion(article) {
    return article.type !== 'promotion';
}

function toNotBeDiscount(article) {
    return article.typ !== 'discount';
}

function toId(article) {
    return article.id;
}
