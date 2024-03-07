import { query } from './db-functions.mjs';
import { getLatestArticlesSellmentId } from './articles-sellment.mjs';
import { Order } from './schema/order.mjs';
import { OrderProduct } from './schema/order-product.mjs';
import { OrderProductOption } from './schema/order-product-option.mjs';

export async function createOrder(products, paymentMethod, workerId, clientId = null) {
    const paymentMethodId = await getPaymentMethodIdByName(paymentMethod);
    const orderStatus = products.some((product) => product.selectedOptions.length > 0) ? 'new' : 'nd';

    await query(`INSERT INTO orders VALUES(null, ?, ?, ?, null, null, ?)`, [
        workerId,
        clientId,
        paymentMethodId,
        orderStatus,
    ]);
    const orderId = await getLatestOrderId();

    for (const product of products) {
        await query(`INSERT INTO articles_sellment VALUES(null, ?, ?, ?, ?)`, [
            product.id,
            orderId,
            product.price,
            product.amount,
        ]);

        if (product.selectedOptions.length > 0) {
            const articlesSellmentId = await getLatestArticlesSellmentId();
            await Promise.all(
                product.selectedOptions.map(({ category_id, option_id }) =>
                    query(`INSERT INTO products_options_list VALUES(null, ?, ?, ?)`, [
                        articlesSellmentId,
                        category_id,
                        option_id,
                    ])
                )
            );
        }
    }

    const orderNumber = getOrderNumber(orderId);
    return orderNumber;
}

export async function getOrders() {
    const ordersRAW = await query(`
        SELECT 
            orders.id as order_id,
            orders.status as order_status,
            articles_sellment.id as articles_sellment_id,
            articles.short_name,
            products_category.name as option_category_name,
            products_options.name as option_name 
        FROM 
            orders 
        INNER JOIN 
            articles_sellment ON articles_sellment.order_id = orders.id 
        INNER JOIN
            articles ON articles.id = articles_sellment.article_id 
        INNER JOIN
            products_options_list ON products_options_list.articles_sellment_id = articles_sellment.id 
        INNER JOIN
            products_category ON products_category.id = products_options_list.category_id 
        INNER JOIN
            products_options ON products_options.id = products_options_list.option_id 
        WHERE 
            STATUS IN ("new", "done");`);

    const orders = [];
    for (const order of ordersRAW) {
        const existingOrderIdx = orders.map((existingOrder) => existingOrder.order_id).indexOf(order.order_id);
        if (existingOrderIdx === -1) {
            orders.push(
                new Order(order.order_id, order.order_status, [
                    new OrderProduct(order.articles_sellment_id, order.short_name, [
                        new OrderProductOption(order.option_category_name, order.option_name),
                    ]),
                ])
            );
            continue;
        }

        const existingProductIdx = orders[existingOrderIdx].products
            .map((product) => product.articles_sellment_id)
            .indexOf(order.articles_sellment_id);
        if (existingProductIdx === -1) {
            orders[existingOrderIdx].products.push(
                new OrderProduct(order.articles_sellment_id, order.short_name, [
                    new OrderProductOption(order.option_category_name, order.option_name),
                ])
            );
        } else {
            orders[existingOrderIdx].products[existingProductIdx].options.push(
                new OrderProductOption(order.option_category_name, order.option_name)
            );
        }
    }

    orders.sort((order1, order2) => {
        if (order1.order_id > order2.order_id) {
            return 1;
        }
        if (order1.order_id < order2.order_id) {
            return -1;
        }
        return 0;
    });

    return orders;
}

export function getOrderNumber(id) {
    return +id.toString().slice(-2);
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
