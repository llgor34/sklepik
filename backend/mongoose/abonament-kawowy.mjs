import { db } from './index.mjs';

const coffeeSubscriptionSchema = new db.Schema({
	imie: String,
	nazwisko: String,
	liczba_pozostalych_kaw: Number,
	daty_odebranych_kaw: [String],
});

export const abonament_kawowy = db.model('abonament_kawowy', coffeeSubscriptionSchema, 'abonament_kawowy');
