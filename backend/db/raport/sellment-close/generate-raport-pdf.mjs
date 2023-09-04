import { readFileSync } from 'fs';
import { create } from 'pdf-creator-node';

export async function generateRaportPDF(raportRaw, date, number, yearNumber) {
	const RAPORT_PATH = 'public/raports/raport.pdf';
	const raport = JSON.parse(JSON.stringify(raportRaw));
	raport.products = [];

	for (const key in raportRaw.products) {
		raport.products.push({ ...raportRaw.products[key], products: raportRaw.products[key].products.map((product, i) => ({ i: i + 1, ...product })) });
	}

	const html = readFileSync('templates/sellment-close-template.html', 'utf8');
	const options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm',
		footer: {
			height: '28mm',
			contents: {
				default: '<span style="color: #444">{{page}}</span> z <span>{{pages}}</span>',
			},
		},
	};

	var document = {
		html: html,
		data: {
			date,
			number,
			yearNumber,
			raport,
		},
		path: RAPORT_PATH,
	};

	await create(document, options);
	return RAPORT_PATH;
}
