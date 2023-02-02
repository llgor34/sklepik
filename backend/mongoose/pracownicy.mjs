import { db } from './index.mjs';

const workerSchema = new db.Schema({
	imie: String,
	nazwisko: String,
	nazwa_uzytkownika: String,
	haslo: String,
	role: [String],
	udzialy: {
		type: Map,
		of: new db.Schema({
			wplacono: {
				type: Map,
				of: new db.Schema({
					kwota: String,
					data: String,
					nr_kp: String,
				}),
			},
			wyplacono: {
				type: Map,
				of: new db.Schema({
					kwota: String,
					data: String,
					nr_kw: String,
				}),
			},
		}),
	},
});

export const pracownicy = db.model('pracownicy', workerSchema, 'pracownicy');
