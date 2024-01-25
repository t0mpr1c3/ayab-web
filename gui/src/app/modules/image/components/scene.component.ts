import { 
  ChangeDetectionStrategy, 
  Component, 
  HostListener,
} from '@angular/core';
import { ToolbarFacade } from '../../toolbar/facade/toolbar.facade';

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
  providers: [ToolbarFacade],
})
export class SceneComponent {
  private _scale = 1;

  constructor(private _facade: ToolbarFacade) {}
  
  @HostListener('wheel', ['$event']) onMouseWheel(event: WheelEvent) {
    event.preventDefault();
    let zoom = this._scale;
    zoom += event.deltaY * -0.05;
    console.log(zoom)
    zoom = Math.min(Math.max(1, Math.floor(zoom * 4)/4), 8);
    if (this._scale !== zoom) {
      this._scale = zoom;
      this._facade.imageZoomed({x: zoom, y: zoom});
    }
  }
}