import { 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  Component, 
  ComponentRef, 
  ViewChild, 
  ViewContainerRef 
} from '@angular/core';

import { CoreFacade } from '../../facade/core.facade';
import { OptionsPanelComponent } from '../../../options/components/options-panel/options-panel.component';
import { SceneComponent } from '../../../image/components/scene.component';

/**
 * @title Layout component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css'],
  providers: [CoreFacade],
})
export class LayoutComponent {
  @ViewChild('optionsPlaceholder', { read: ViewContainerRef, static: true }) optionsVcf: ViewContainerRef;
  @ViewChild('scenePlaceholder', { read: ViewContainerRef, static: true }) sceneVcf: ViewContainerRef;
  
  public imageLoaded$ = this._facade.imageLoaded$;
  public sceneCreated$ = this._facade.sceneCreated$;
  public shown: boolean = false;
  private _created: boolean = false;  
  private _options: ComponentRef<OptionsPanelComponent>;
  private _scene: ComponentRef<SceneComponent>;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _facade: CoreFacade,
  ) {
    // Create scene and show options panel when image loaded
    this.imageLoaded$.subscribe(loaded => {
      if (loaded) {
        this.createScene();
        this.showOptions();
      }
    });
  }

  public createScene() {
    if (this._created) {
      return;
    }
    this._created = true;

    // Lazy load Image module
    import('../../../image/image.module').then(() => {
      if (!this._scene) {
        this._scene = this.sceneVcf.createComponent(SceneComponent);
        this._cdr.detectChanges(); // refresh view
      }
    });
    
    // Update state
    this._facade.createScene();
  }
  
  public hideOptions() {
    this.shown = false;

    // Update state
    this._facade.hideOptions();
  }
  
  public showOptions() {
    if (this.shown) {
      return;
    }
    this.shown = true;

    // Lazy load Options module
    import('../../../options/options.module').then(() => {
      if (!this._options) {
        this._options = this.optionsVcf.createComponent(OptionsPanelComponent);
        this._cdr.detectChanges(); // refresh view
      }
    });
    
    // Update state
    this._facade.showOptions();
  }
}