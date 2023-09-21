import { jsPDF } from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import * as robotoNormalFont from '../../../public/Roboto/Roboto-Regular-normal.mjs';
import * as robotoBoldFont from '../../../public/Roboto/Roboto-Regular-bold.mjs';
import * as robotoItalicFont from '../../../public/Roboto/Roboto-Regular-italic.mjs';

export async function generateRaportPDF(raportRaw, date, number, yearNumber) {
	const RAPORT_PATH = 'test.pdf';
	const CURRENCY = 'PLN';

	const H1_CLASS = { halign: 'center', fontStyle: 'bold', fillColor: [223, 27, 33], textColor: [255, 255, 255] };
	const H2_CLASS = { ...H1_CLASS, fillColor: [245, 105, 105] };
	const SIGNATURE_CLASS = { halign: 'center', fontStyle: 'italic', minCellHeight: 25 };

	const raport = JSON.parse(JSON.stringify(raportRaw));
	raport.products = [];

	for (const key in raportRaw.products) {
		raport.products.push({ ...raportRaw.products[key], products: raportRaw.products[key].products.map((product, i) => ({ i: i + 1, ...product })) });
	}

	const articleArr = [];
	for (const article of raport.products) {
		for (const product of article.products) {
			articleArr.push([product.i, product.code, product.short_name, `${product.price} ${CURRENCY}`, product.amount, `${product.totalPrice} ${CURRENCY}`]);
		}
		articleArr.push([
			{ content: article.totalPriceLabel, colSpan: 5, styles: H2_CLASS },
			{ content: `${article.totalPrice} ${CURRENCY}`, styles: H2_CLASS },
		]);
	}

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
			lineColor: [50, 50, 50],
			lineWidth: 0.1,
		},
		body: [
			[{ content: 'Dzienny Przychód Sklepiku', colSpan: 3 }, { content: 'Data', colSpan: 2 }, { content: `ZS/23/24/${number}` }].map(element => ({ ...element, styles: H1_CLASS })),
			['Lp', 'Kod', 'Nazwa', 'Cena', 'Ilość', 'Suma'].map(content => ({ content, styles: H1_CLASS })),
			...articleArr,
			['Saldo kasowe', 'Saldo terminala'].map(content => ({ content, colSpan: 3, styles: SIGNATURE_CLASS })),
			['Podpisy załogi', 'Podpis kierownika/zastępcy'].map(content => ({ content, colSpan: 3, styles: SIGNATURE_CLASS })),
		],
	});
	doc.save('test.pdf');
	return RAPORT_PATH;
}
