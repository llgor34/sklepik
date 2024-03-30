import { InjectionToken } from '@angular/core';
import { HotdogConfig } from '../interfaces/hotdog-config.interface';

export const HOTDOG_CONFIG = new InjectionToken<HotdogConfig>('Hotdog Config', {
    providedIn: 'root',
    factory: () => ({
        hotdog_code: '30',
        doubledog_code: '31',
        zegdog_code: '32',
        all_codes: ['30', '31', '32'],
    }),
});
