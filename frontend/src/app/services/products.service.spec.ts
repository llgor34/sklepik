import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { ProductType } from '../interfaces/product-type.interface';
import { NumeratedProduct, Product, ProductResponse, ProductsResponse } from '../interfaces/product.interface';
import { Response } from '../interfaces/response.interface';
import { IdResponse } from '../interfaces/id-response.interface';
import { testRequestType } from '../testing/generic.spec';

describe('ProductsService', () => {
    let service: ProductsService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService],
        });

        service = TestBed.inject(ProductsService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    describe('getProductsTypeList()', () => {
        it('should return ProductType[] off all types', () => {
            const expectedProductTypes: ProductType[] = ['article', 'discount', 'product', 'promotion'];

            const productTypes: ProductType[] = service.getProductTypeList();

            expect(productTypes).toEqual(jasmine.arrayContaining(expectedProductTypes));
        });
    });

    describe('getProductsIdWithDisabledAmount()', () => {
        it('should return number[]', () => {
            const productsIdWithDisabledAmount = service.getProductsIdWithDisabledAmount();

            for (const id of productsIdWithDisabledAmount) {
                expect(id).toBeInstanceOf(Number);
            }
        });
    });

    describe('productHasDisabledAmount()', () => {
        let methodSpy: jasmine.Spy<() => number[]>;

        beforeEach(() => {
            methodSpy = spyOn(service, 'getProductsIdWithDisabledAmount');
            methodSpy.and.returnValue([0]);
        });

        it('should call getProductsIdWithDisabledAmount()', () => {
            service.productHasDisabledAmount(0);

            expect(service.getProductsIdWithDisabledAmount).toHaveBeenCalled();
        });

        it('should return true for product with disabled amount', () => {
            const hasProductDisabledAmount = service.productHasDisabledAmount(0);

            expect(hasProductDisabledAmount).toEqual(true);
        });

        it('should return false for product with enabled amount', () => {
            const hasProductDisabledAmount = service.productHasDisabledAmount(1);

            expect(hasProductDisabledAmount).toEqual(false);
        });
    });

    describe('isProductDisabled()', () => {
        let product: Product;

        beforeEach(() => {
            product = getProduct();
        });

        it('should return true if product is discount', () => {
            product.type = 'discount';

            const isDisabled = service.isProductDisabled(product);

            expect(isDisabled).toEqual(true);
        });

        it('should return false if product is not discount', () => {
            const isDisabled = service.isProductDisabled(product);

            expect(isDisabled).toEqual(false);
        });
    });

    describe('isSellOrder()', () => {
        let products: Product[];

        beforeEach(() => {
            products = getProducts();
        });

        it('should call hasProductOptions()', () => {
            const spy = spyOn(service, 'hasProductOptions');
            spy.and.callThrough();

            service.isSellOrder(products);

            expect(service.hasProductOptions).toHaveBeenCalled();
        });

        it('should return true if some product has options', () => {
            setOptionForProductAtIdx(products, 0);

            const isSellOrder = service.isSellOrder(products);

            expect(isSellOrder).toBeTruthy();
        });

        it('should return false if no product has options', () => {
            const isSellOrder = service.isSellOrder(products);

            expect(isSellOrder).toBeFalsy();
        });
    });

    describe('hasProductOptions()', () => {
        let product: Product;

        beforeEach(() => {
            product = getProduct();
        });

        it('should return true if product options length is > 0', () => {
            setOptionForProduct(product);

            const hasProductOptions = service.hasProductOptions(product);

            expect(hasProductOptions).toBeTruthy();
        });

        it('should return false if product options length is == 0', () => {
            const hasProductOptions = service.hasProductOptions(product);

            expect(hasProductOptions).toBeFalsy();
        });
    });

    describe('getProductByCode$()', () => {
        const code = 1;
        const url = `api/product/${code}`;

        it(`should GET request on "${url}"`, () => {
            testRequestType(url, 'GET', () => service.getProductByCode$(code), httpController);
        });

        it('should return NumeratedProduct if product was received from backend', () => {
            const mockResponse: ProductResponse = {
                ok: true,
                message: 'SUCCESS',
                product: getProduct(),
            };
            ``;
            const expectedNumeratedProduct = convertProductToNumeratedProduct(mockResponse.product!);

            service.getProductByCode$(code).subscribe((numeratedProduct) => {
                expect(numeratedProduct).toEqual(expectedNumeratedProduct);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });

        it('should return return null if product was not received from backend', () => {
            const mockResponse: ProductResponse = {
                ok: true,
                message: 'SUCCESS',
                product: null,
            };

            service.getProductByCode$(code).subscribe((numeratedProduct) => {
                expect(numeratedProduct).toEqual(null);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('getProducts$()', () => {
        const url = 'api/product';

        it(`should GET request "${url}"`, () => {
            testRequestType(url, 'GET', () => service.getProducts$(), httpController);
        });

        it('should return Product[]', () => {
            const mockResponse: ProductsResponse = {
                ok: true,
                message: 'SUCCESS',
                products: getProducts(),
            };

            service.getProducts$().subscribe((products) => {
                expect(products).toEqual(mockResponse.products);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('updateProduct$()', () => {
        const id = 0;
        const url = `api/product/${id}`;

        let productData: Partial<Product>;

        beforeEach(() => {
            productData = getProductData();
        });

        it(`should PUT request "${url}"`, () => {
            testRequestType(url, 'PUT', () => service.updateProduct$(id, productData), httpController);
        });

        it('should return Response', () => {
            const mockResponse: Response = {
                ok: true,
                message: 'SUCCESS',
            };

            service.updateProduct$(id, productData).subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('deleteProduct$()', () => {
        const id = 0;
        const url = `api/product/${id}`;

        it(`should DELETE request "${url}"`, () => {
            testRequestType(url, 'DELETE', () => service.deleteProduct$(id), httpController);
        });

        it('should return Response', () => {
            const mockResponse: Response = {
                ok: true,
                message: 'SUCCESS',
            };

            service.deleteProduct$(id).subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('createProduct()', () => {
        const url = `api/product`;
        let product: Product;

        beforeEach(() => {
            product = getProduct();
        });

        it(`should POST request "${url}"`, () => {
            testRequestType(url, 'POST', () => service.createProduct$(product), httpController);
        });

        it('should return IdResponse', () => {
            const mockResponse: IdResponse = {
                ok: true,
                message: 'SUCCESS',
                id: 0,
            };

            service.createProduct$(product).subscribe((id) => {
                expect(id).toEqual(mockResponse.id);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});

function getProducts(): Product[] {
    const products: Product[] = [];
    products.length = 6;
    products.fill(getProduct(), 0, 5);
    return products;
}

function getProduct(): Product {
    return {
        code: '',
        company: { id: 0, name: '' },
        full_name: '',
        id: 0,
        maxDiscountAmount: 0,
        price: 0,
        product_category_options: [],
        short_name: '',
        type: 'article',
    };
}

function getProductData(): Partial<Product> {
    return { code: '123' };
}

function setOptionForProductAtIdx(products: Product[], idx: number) {
    setOptionForProduct(products[idx]);
}

function setOptionForProduct(product: Product) {
    product.product_category_options = [{ category_id: 1, category_name: '', options: [{ id: 1, name: '' }] }];
}

function convertProductToNumeratedProduct(product: Product): NumeratedProduct {
    const numeratedProduct = {
        ...product,
        amount: 1,
        selectedOptions: product.product_category_options!.map((category) => ({
            category_id: category.category_id,
            option_id: category.options[0].id,
        })),
    };

    return numeratedProduct;
}
