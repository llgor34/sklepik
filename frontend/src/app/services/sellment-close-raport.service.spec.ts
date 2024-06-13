import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SellmentCloseRaportService } from './sellment-close-raport.service';
import { testRequestType } from '../testing/generic.spec';
import { SellmentCloseRaport } from '../interfaces/sellment-close-product.interface';
import { Response } from '../interfaces/response.interface';

describe('SellmentCloseRaportService', () => {
    let service: SellmentCloseRaportService;
    let httpController: HttpTestingController;
    const mockRaportData: SellmentCloseRaport = {
        raport: {
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
        raportInfo: {
            date: '',
            id: 1,
            number: 123,
            year_number: '23/24',
        },
    };

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

    describe('getRaportPreviewLatest$()', () => {
        const url = 'api/raports/sellment-close/raport-preview';

        it(`should GET request on ${url}`, () => {
            testRequestType(url, 'GET', () => service.getRaportPreviewLatest$(), httpController);
        });

        it('should return SellmentCloseRaport', () => {
            const mockResponse: Response<SellmentCloseRaport> = {
                ok: true,
                message: 'SUCCESS',
                data: mockRaportData,
            };

            service.getRaportPreviewLatest$().subscribe((raport) => {
                expect(raport).toEqual(mockResponse.data);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('getRaportPreviewById$()', () => {
        const id = 1;
        const url = `api/raports/sellment-close/raport-preview/${id}`;

        it(`should GET request on ${url}`, () => {
            testRequestType(url, 'GET', () => service.getRaportPreviewById$(id), httpController);
        });

        it('should return SellmentCloseRaport', () => {
            const mockResponse: Response<SellmentCloseRaport> = {
                ok: true,
                message: 'SUCCESS',
                data: mockRaportData,
            };

            service.getRaportPreviewById$(id).subscribe((raport) => {
                expect(raport).toEqual(mockResponse.data);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('generateRaportLatest$()', () => {
        const url = 'api/raports/sellment-close/generate-raport';

        it(`should GET request on ${url}`, () => {
            testRequestType(url, 'GET', () => service.generateRaportLatest$(), httpController);
        });

        it('should return Blob', () => {
            const mockResponse: Blob = new Blob();

            service.generateRaportLatest$().subscribe((blob) => {
                expect(blob).toEqual(mockResponse);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('generateRaportById$()', () => {
        const id = 1;
        const url = `api/raports/sellment-close/generate-raport/${id}`;

        it(`should GET request ${url}`, () => {
            testRequestType(url, 'GET', () => service.generateRaportById$(id), httpController);
        });

        it('should return Blob', () => {
            const mockResponse: Blob = new Blob();

            service.generateRaportById$(id).subscribe((blob) => {
                expect(blob).toEqual(mockResponse);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
