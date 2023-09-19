// import { readFileSync } from 'fs';
// import { create } from 'pdf-creator-node';
import { jsPDF } from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import * as robotoNormalFont from '../../../public/Roboto/Roboto-Regular-normal.mjs';

export async function generateRaportPDF(raportRaw, date, number, yearNumber) {
	const RAPORT_PATH = 'test.pdf';

	const raport = JSON.parse(JSON.stringify(raportRaw));
	raport.products = [];

	for (const key in raportRaw.products) {
		raport.products.push({ ...raportRaw.products[key], products: raportRaw.products[key].products.map((product, i) => ({ i: i + 1, ...product })) });
	}

	const arr = raport.products.map(article => [...article.products.map(product => [product.i, product.code, product.short_name, product.price, product.amount, product.totalPrice]), [{ content: article.totalPriceLabel, colSpan: 5, styles: { halign: 'center' } }, article.totalPrice]]);

	const doc = new jsPDF({
		orientation: 'portrait',
		unit: 'mm',
		format: [210, 297],
	});
	doc.setFont('Roboto-Regular');
	doc.autoTable({
		theme: 'grid',
		styles: {
			font: 'Roboto-Regular',
		},
		body: [
			[{ content: 'Dzienny Przychód Sklepiku', colSpan: 3, styles: { halign: 'center' } }, { content: 'Data', colSpan: 2, styles: { halign: 'center' } }, { content: `ZS/23/24/${number}` }],
			['Lp', 'Kod', 'Nazwa', 'Cena', 'Ilość', 'Suma'],
			[
				{ content: 'Saldo kasowe', colSpan: 3, styles: { halign: 'center' } },
				{ content: 'Saldo terminala', colSpan: 3, styles: { halign: 'center' } },
			],
			[
				{ content: 'Podpisy załogi', colSpan: 3, styles: { halign: 'center' } },
				{ content: 'Podpis kierownika/zastępcy', colSpan: 3, styles: { halign: 'center' } },
			],
		],
	});
	doc.save('test.pdf');

	// const html = readFileSync('templates/sellment-close-template.html', 'utf8');
	// const options = {
	// 	format: 'A4',
	// 	orientation: 'portrait',
	// 	border: '10mm',
	// 	footer: {
	// 		height: '28mm',
	// 		contents: {
	// 			default: '<span style="color: #444">{{page}}</span> z <span>{{pages}}</span>',
	// 		},
	// 	},
	// };

	// var document = {
	// 	html: html,
	// 	data: {
	// 		date,
	// 		number,
	// 		yearNumber,
	// 		raport,
	// 	},
	// 	path: RAPORT_PATH,
	// };

	// await create(document, options);
	return RAPORT_PATH;
}
