import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Scene component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scene',
  template: `
    <div onscroll="scroll($event)">
      <canvas id="canvas"></canvas>
    </div>
  `,
  styles: [`
    canvas {
      margin-left: auto;
      margin-right: auto;
      display: block;
      cursor: ns-resize;
    }
  `],
})
export class SceneComponent {
  public scroll(event: Event) {
    console.log(event)
  }
}