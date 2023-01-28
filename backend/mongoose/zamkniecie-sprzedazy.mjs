import { db } from './index.mjs';

const sellClosementSchema = db.Schema({
	numer: String,
	data: String,
	wystawil: String,
	rozliczenie: {
		type: Map,
		of: db.Schema({
			sprzedaz_towary: Number,
			sprzedaz_materialy: Number,
			straty: Number,
			obroty: Number,
		}),
	},
	sprzedane_towary: [
		{
			type: Map,
			of: db.Schema({
				id_pracownika: { type: db.Schema.Types.ObjectId },
				lista_zakupow: [
					{
						type: Map,
						of: db.Schema({
							id_artykulu: db.Schema.Types.ObjectId,
							cena: Number,
							ilosc: Number,
						}),
					},
				],
			}),
		},
	],
});

export const zamkniecie_sprzedazy = db.model('zamkniecie_sprzedazy', sellClosementSchema, 'zamkniecie_sprzedazy');
