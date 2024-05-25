import { HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

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
