import { InjectionToken } from '@angular/core';
import { BunConfig } from '../interfaces/bun-config.interface';

export const BUN_CONFIG = new InjectionToken<BunConfig>('Bun Config', {
    providedIn: 'root',
    factory: () => ({
        bun_butter_code: '41',
        bun_ham_code: '42',
        bun_cheese_code: '43',
        bun_ham_cheese_code: '44',
        bun_golosz_code: '45',
        bun_code: '49',
        all_codes: ['41', '42', '43', '44', '45', '49'],
    }),
});
