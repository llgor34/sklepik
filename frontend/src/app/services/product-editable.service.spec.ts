import { TestBed } from '@angular/core/testing';
import { ProductEditableService } from './product-editable.service';
import { ProductsService } from './products.service';
import { ProductType } from '../interfaces/product-type.interface';
import { EditableItem } from '../interfaces/editable-item.interface';

describe('ProductEditableService', () => {
    let service: ProductEditableService;
    let productsServiceMock: jasmine.SpyObj<ProductsService>;

    const productTypes: ProductType[] = ['article', 'discount', 'product', 'promotion'];
    const productTypesEditable: EditableItem<ProductType>[] = [
        { id: 0, label: 'article' },
        { id: 1, label: 'discount' },
        { id: 2, label: 'product' },
        { id: 3, label: 'promotion' },
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductEditableService,
                {
                    provide: ProductsService,
                    useValue: jasmine.createSpyObj('ProductsService', ['getProductTypeList']),
                },
            ],
        });
        service = TestBed.inject(ProductEditableService);
        productsServiceMock = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    });

    describe('getProductEditableTypeList()', () => {
        beforeEach(() => {
            productsServiceMock.getProductTypeList.and.returnValue(productTypes);
        });

        it('should call productsService.getProductTypeList()', () => {
            service.getProductEditableTypeList();
            expect(productsServiceMock.getProductTypeList).toHaveBeenCalled();
        });

        it('should return EditableItem<ProductType>[]', () => {
            const result = service.getProductEditableTypeList();
            expect(result).toEqual(productTypesEditable);
        });
    });

    describe('getProductEditableTypeById()', () => {
        beforeEach(() => {
            spyOn(service, 'getProductEditableTypeList').and.returnValue(productTypesEditable);
        });

        it('should return ProductType of given Id', () => {
            const result = service.getProductEditableTypeById(0);

            expect(result).toEqual(productTypesEditable[0].label);
        });

        it('should call getProductEditableTypeList()', () => {
            service.getProductEditableTypeById(0);

            expect(service.getProductEditableTypeList).toHaveBeenCalled();
        });
    });

    describe('getProductEditableTypeByProductType()', () => {
        beforeEach(() => {
            spyOn(service, 'getProductEditableTypeList').and.returnValue(productTypesEditable);
        });

        it('should return EditableItem<ProductType> of give ProductType', () => {
            const result = service.getProductEditableTypeByProductType(productTypesEditable[0].label);

            expect(result).toEqual(productTypesEditable[0]);
        });

        it('should call getProductEditableTypeList()', () => {
            service.getProductEditableTypeByProductType('article');

            expect(service.getProductEditableTypeList).toHaveBeenCalled();
        });
    });
});
