import { createAction } from '@ngrx/store';

export const startFirmware = createAction('[Firmware] Start firmware upload');
export const stopFirmware = createAction('[Firmware] Stop firmware upload');