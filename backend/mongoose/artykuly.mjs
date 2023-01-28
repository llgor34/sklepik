import { db } from './index.mjs';

const articleSchema = db.Schema({
	id_firmy: { type: db.Schema.Types.ObjectId },
	cena: Number,
	kod: String,
	typ: {
		type: String,
		enum: ['towar', 'produkt'],
	},
	nazwa_krotka: String,
	nazwa_pelna: String,
	ewidencja: [],
});

export const artykuly = db.model('artykuly', articleSchema, 'artykuly');
