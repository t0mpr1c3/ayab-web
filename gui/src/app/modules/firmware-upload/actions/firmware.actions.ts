import { createAction } from '@ngrx/store';

export const startFirmwareAction = createAction('[Firmware] Start upload');
export const stopFirmwareAction = createAction('[Firmware] Stop upload');