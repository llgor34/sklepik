import { InjectionToken } from '@angular/core';

export const PANEL_SERVICE_ENDPOINT = new InjectionToken<string>('');

export const providePanelServiceEndpoint = (endpoint: string) => ({
    provide: PANEL_SERVICE_ENDPOINT,
    useValue: endpoint,
});

export const providePanelServiceMultiEndpoint = (id: number, endpoint: string) => ({
    provide: PANEL_SERVICE_ENDPOINT,
    useValue: { id, endpoint },
    multi: true,
});
