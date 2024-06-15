import { HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response.interface';

export function testRequestType(
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    fnToMakeRequest: () => Observable<any>,
    httpController: HttpTestingController
): void {
    fnToMakeRequest().subscribe();
    const testRequest = httpController.expectOne(url);
    expect(testRequest.request.method).toEqual(method);
}

export function testReturnValueShouldEqualResponse(
    url: string,
    fnToMakeRequest: () => Observable<Response>,
    httpController: HttpTestingController
) {
    const mockResponse: Response = { ok: true, message: 'SUCCESS', data: null };

    fnToMakeRequest().subscribe((res) => expect(res).toEqual(mockResponse));
    httpController.expectOne(url).flush(mockResponse);
}

export function testReturnValueShouldEqual<T>(
    url: string,
    mockData: any,
    expectedResult: T,
    fnToMakeRequest: () => Observable<any>,
    httpController: HttpTestingController
) {
    const response: Response = { ok: true, message: 'SUCCESS', data: mockData };

    fnToMakeRequest().subscribe((res) => expect(res).toEqual(expectedResult));
    httpController.expectOne(url).flush(response);
}
