import { createAction } from '@ngrx/store';

export const startFirmware = createAction('[Firmware] Start upload');
export const stopFirmware = createAction('[Firmware] Stop upload');