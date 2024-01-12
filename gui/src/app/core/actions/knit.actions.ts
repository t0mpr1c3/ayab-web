import { createAction } from '@ngrx/store';

export const imageLoaded = createAction('[Knit] Image Loaded');
export const startKnitting = createAction('[Knit] Start Knitting');
export const stopKnitting = createAction('[Knit] Stop Knitting');