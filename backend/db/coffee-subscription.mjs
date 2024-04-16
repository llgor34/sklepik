import { query } from './db-functions.mjs';
import { createLog } from './logs.mjs';

export async function getAllCoffeeSubscriptions() {
    let coffeeSubscriptions = await query(`
    SELECT
        c.id AS client_id,
        c.name,
        c.surname,
        c.mail,
        cs.coffees_left,
        GROUP_CONCAT(l.modified ORDER BY l.modified DESC SEPARATOR ',') AS coffees_receive_datetimes
    FROM 
        clients AS c
    LEFT JOIN 
        coffee_subscription AS cs ON c.id = cs.client_id
    LEFT JOIN
        logs AS l ON c.id = l.client_id AND l.type = 'COFFEE_RECEIVED'
    GROUP BY 
        c.id
`);

    coffeeSubscriptions = coffeeSubscriptions.map((coffeeSubscription) => {
        return {
            ...coffeeSubscription,
            coffees_receive_datetimes: coffeeSubscription.coffees_receive_datetimes
                ? coffeeSubscription.coffees_receive_datetimes.split(',')
                : [],
        };
    });

    return coffeeSubscriptions;
}

export async function updateCoffeeSubscriptionByAmount(client_id, worker_id, amount) {
    const operationType = 'COFFEE_CORRECTION';
    const operationDescription = `Coffee has been manually updated by worker by amount: ${amount}`;
    await updateCoffeeSubscription(client_id, worker_id, amount, operationType, operationDescription);
}

export async function updateCoffeeSubscriptionByReceiveCoffee(client_id, worker_id) {
    const operationType = 'COFFEE_RECEIVED';
    const operationDescription = 'Coffee has been automatically updated by program by amount: -1';
    await updateCoffeeSubscription(client_id, worker_id, -1, operationType, operationDescription);
}

async function updateCoffeeSubscription(client_id, worker_id, amount, type, description) {
    await query('UPDATE coffee_subscription SET coffees_left = coffees_left + ? WHERE client_id = ?', [
        amount,
        client_id,
    ]);
    await createLog(type, description, worker_id, client_id);
}
