import { createReducer, on } from '@ngrx/store';
import * as fromImage from '../actions/image.actions';

import SceneHelper from '../helpers/scene.helper';
import TransformsHelper from '../helpers/transforms.helper';
import { Scale } from '../../toolbar/models/scale.model';
import { SerializedImageData } from '../model/serialized-image-data.model';

export const featureKey = 'image';

export interface State {
  data: SerializedImageData|null;
  scale: Scale;
  sceneCreated: boolean;
}

export const initialState: State = {
  data: null,
  scale: { x: 1, y: 1 },
  sceneCreated: false,
};

export const reducer = createReducer(
  initialState,

  on(fromImage.createSceneAction, state => ({ 
    ...state, 
    sceneCreated: true,
  })),

  on(fromImage.loadImageAction, (state, { data }) => ({ 
    ...state,
    data: data, 
    scale: { x: 1, y: 1 },
  })),

  on(fromImage.zoomImageAction, (state, { scale }) => ({ 
    ...state,
    scale: scale,
  })),

  on(fromImage.invertImageAction, state => ({ 
    ...state,
    data: SceneHelper.transform( state.data!, TransformsHelper.invertImage ),
  })),

  on(fromImage.stretchImageAction, (state, { scale: scale }) => ({ 
    ...state,
    data: SceneHelper.transform( state.data!, TransformsHelper.stretchImage( scale )),
  })),

  on(fromImage.repeatImageAction, (state, { scale: scale }) => ({ 
    ...state,
    data: SceneHelper.transform( state.data!, TransformsHelper.repeatImage( scale )),
  })),

  on(fromImage.reflectImageAction, (state, { mirrors: mirrors }) => ({ 
    ...state,
    data: SceneHelper.transform( state.data!, TransformsHelper.reflectImage( mirrors )),
  })),

  on(fromImage.hFlipImageAction, state => ({ 
    ...state,
    data: SceneHelper.transform( state.data!, TransformsHelper.hFlipImage ),
  })),

  on(fromImage.vFlipImageAction, state => ({ 
    ...state,
    data: SceneHelper.transform( state.data!, TransformsHelper.vFlipImage ),
  })),

  on(fromImage.rotateImageLeftAction, state => ({ 
    ...state,
    data: SceneHelper.transform( state.data!, TransformsHelper.rotateImageLeft ),
  })),

  on(fromImage.rotateImageRightAction, state => ({ 
    ...state,
    data: SceneHelper.transform( state.data!, TransformsHelper.rotateImageRight ),
  })),
);

export const selectImage = (state: State) => state.data;
export const selectImageWidth = (state: State) => state.data?.width;
export const selectImageHeight = (state: State) => state.data?.height;
export const selectImageLoaded = (state: State) => !!state.data;
export const selectImageScale = (state: State) => state.scale;
export const selectImageXScale = (state: State) => state.scale.x;
export const selectImageYScale = (state: State) => state.scale.y;
export const selectSceneCreated = (state: State) => state.sceneCreated;