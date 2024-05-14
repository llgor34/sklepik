import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SellmentCloseRaportService } from './sellment-close-raport.service';
import { SellmentCloseDataResponse } from '../interfaces/sellment-close-product.interface';
import { testRequestType } from '../testing/generic.spec';

describe('SellmentCloseRaportService', () => {
    let service: SellmentCloseRaportService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SellmentCloseRaportService],
        });

        service = TestBed.inject(SellmentCloseRaportService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    describe('getProducts()', () => {
        const url = 'api/raports/sellment-close/latest-raport-preview';

        it(`should GET request "${url}"`, () => {
            testRequestType(url, 'GET', () => service.getProducts$(), httpController);
        });

        it('should return SellmentCloseRaport', () => {
            const mockResponse: SellmentCloseDataResponse = {
                ok: true,
                message: 'SUCCESS',
                data: {
                    products: {
                        article: { products: [], totalPrice: 100, totalPriceLabel: 'kwota' },
                        discount: { products: [], totalPrice: 100, totalPriceLabel: 'test' },
                        product: { products: [], totalPrice: 100, totalPriceLabel: 'test' },
                        promotion: { products: [], totalPrice: 100, totalPriceLabel: 'test' },
                    },
                    totalCashPrice: 100,
                    totalNonCashPrice: 100,
                    totalPrice: 200,
                    totalPriceWithDiscounts: 200,
                },
            };

            service.getProducts$().subscribe((raport) => {
                expect(raport).toEqual(mockResponse.data);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('generateRaport$()', () => {
        const url = 'api/raports/sellment-close/generate-raport';

        it(`should GET request "${url}"`, () => {
            testRequestType(url, 'GET', () => service.generateRaport$(), httpController);
        });

        it('should return Blob', () => {
            const mockResponse: Blob = new Blob();

            service.generateRaport$().subscribe((blob) => {
                expect(blob).toEqual(mockResponse);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
