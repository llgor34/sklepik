import { query } from './db-functions.mjs';
import { getLatestArticlesSellmentId } from './articles-sellment.mjs';

export async function createOrder(products, paymentMethod, workerId, clientId = null) {
    const paymentMethodId = await getPaymentMethodIdByName(paymentMethod);
    const orderStatus = products.some(product => product.selectedOptions.length > 0) ? 'new' : 'nd';

    await query(`INSERT INTO orders VALUES(null, ?, ?, ?, null, null, ?)`, [workerId, clientId, paymentMethodId, orderStatus]);
    const orderId = await getLatestOrderId();

    for (const product of products) {
        await query(`INSERT INTO articles_sellment VALUES(null, ?, ?, ?, ?)`, [product.id, orderId, product.price, product.amount]);

        if (product.selectedOptions.length > 0) {
            const articlesSellmentId = await getLatestArticlesSellmentId();
            await Promise.all(product.selectedOptions.map(({ category_id, option_id }) => query(`INSERT INTO products_options_list VALUES(null, ?, ?, ?)`, [articlesSellmentId, category_id, option_id])));
        }
    }

    const orderNumber = getOrderNumber(orderId);
    return orderNumber;
}

function getOrderNumber(id) {
    return id.toString().slice(-2);
}

async function getPaymentMethodIdByName(name) {
    const res = await query(`SELECT id FROM payment_methods WHERE name = ?`, [name]);

    const record = res[0];
    if (!record) {
        return null;
    }
    return record.id;
}

async function getLatestOrderId() {
    const result = await query('SELECT id FROM orders ORDER BY id DESC LIMIT 1');
    const record = result[0];
    return record.id;
}
