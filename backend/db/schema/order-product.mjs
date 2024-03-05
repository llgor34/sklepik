export class OrderProduct {
	articles_sellment_id;
	short_name;
	options;

	constructor(articles_sellment_id, short_name, options) {
		this.articles_sellment_id = articles_sellment_id;
		this.short_name = short_name;
		this.options = options;
	}
}
