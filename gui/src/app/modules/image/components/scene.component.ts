import { 
  ChangeDetectionStrategy, 
  Component, 
  HostListener,
} from '@angular/core';

import ImageFacade from '../facade/image.facade';
import SceneHelper from '../helpers/scene.helper';

/**
 * @title Scene component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scene',
  template: `
    <canvas id="canvas"></canvas>
  `,
  styles: [`
    canvas {
      margin-left: auto;
      margin-right: auto;
      display: block;
      cursor: ns-resize;
    }
  `],
  providers: [ImageFacade],
})
export default class SceneComponent {
  private _scale = 1;

  constructor(private _facade: ImageFacade) {}
  
  @HostListener('wheel', ['$event']) onMouseWheel(event: WheelEvent) {
    event.preventDefault();
    let zoom = this._scale;
    zoom += event.deltaY * -0.05;
    zoom = Math.min(Math.max(1, Math.floor(zoom * 4)/4), SceneHelper.MAX_ZOOM);
    if (this._scale !== zoom) {
      this._scale = zoom;
      this._facade.zoomImage({x: zoom, y: zoom});
    }
  }
}