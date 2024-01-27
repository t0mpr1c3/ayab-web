import TransformsHelper from './transforms.helper';
import Scene from '../model/scene.model';
import Scale from '../../toolbar/models/scale.model';
import SerializedImageData from '../model/serialized-image-data.model';
import { AlignmentEnum } from '../../../../../../shared/src/models/alignment-enum.model';

// Impure methods to update canvas etc.
export default class SceneHelper {
  static MAX_ZOOM = 8;

  // cache for ImageData objects that correspond to SerializedImageData objects in the State
  static cache = {};
  
  static getImageData(imageFile: File): Promise<ImageData|null> {
    // Read image file
    const reader = new FileReader();
    reader.onload = function( e ) {
      if (e.target) {
        img.src = ( e.target.result || '' ) as string;
        document.body.appendChild( img );
      }
    }
    reader.readAsDataURL( imageFile );

    // Set up new canvas
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return Promise.resolve( null );
    }
    
    // Create new HTMLImageElement
    const img = new Image();
    img.hidden = true;

    // Get image data
    // FIXME crop image if it is too wide for the machine
    return new Promise<ImageData>( function( resolve, _ ) {
      img.onload = () => {
        // Draw image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage( img, 0, 0 );

        // Get ImageData from HTMLImageElement
        // FIXME cache imageData
        const data = ctx.getImageData( 0, 0, img.width, img.height ) || { data: [] };

        // Delete new HTML elements
        canvas.remove();
        img.remove();

        // Return promise of SerializedImageData
        resolve(data);
      }
    });
  }

  static async drawCanvas(scene: Scene): Promise<void> {
    if (!scene.data) return;
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    let imageData = TransformsHelper.deserialize( scene.data ); // FIXME use cached imageData
    let flippedImageData = (scene.knitSide) ? TransformsHelper.hFlipImage( imageData ) : imageData;
    const bitmap = await createImageBitmap( flippedImageData );
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let sx = scene.scale.x;
      let sy = scene.scale.y;
      let iw = imageData.width;
      let ih = imageData.height;
      let mw = scene.width;
      let sr = scene.startRow;
      let startIndex = scene.startColor === 0 ?
        scene.width / 2 - scene.startNeedle :
        scene.width / 2 + scene.startNeedle - 1;
      let stopIndex = scene.stopColor === 0 ?
        scene.width / 2 - scene.stopNeedle :
        scene.width / 2 + scene.stopNeedle - 1;
      let kw = stopIndex - startIndex + 1;
      let ix = (scene.alignment === AlignmentEnum.Left) ?
        (startIndex + 1) : 
          (scene.alignment === AlignmentEnum.Right) ?
          (stopIndex - iw + 2) : 
          Math.floor((startIndex + stopIndex - iw + 3)/2);
      canvas.width = (mw + 2) * sx;
      canvas.height = (ih + 5) * sy;
      // Draw machine and image
      if (ctx) {
        ctx.imageSmoothingEnabled = false; // keep pixel perfect
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, (2 + mw) * sx, 5 * sy);
        ctx.fillStyle = 'orange';
        ctx.fillRect(sx, sy, mw * sx / 2, 3 * sy);
        ctx.fillStyle = 'green';
        ctx.fillRect(sx + mw * sx / 2, sy, mw * sx / 2, 3 * sy);
        ctx.drawImage(bitmap, ix * sx, 5 * sy, iw * sx, ih * sy);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fillRect(ix * sx, 5 * sy, Math.max(0, (startIndex - ix) * sx), (ih + 5) * sy);
        ctx.fillRect((stopIndex + 3) * sx, 5 * sy, Math.max(0, (ix + iw - (stopIndex + 3)) * sx), (ih + 5) * sy);
        ctx.fillStyle = 'black';
        ctx.fillRect(startIndex * sx, 0, sx, (ih + 5) * sy);
        ctx.fillRect((stopIndex + 2) * sx, 0, sx, (ih + 5) * sy);
        ctx.fillRect((stopIndex + 2) * sx, (ih + 5 - sr) * sy, (2 + mw) * sx, sy);
        ctx.fillRect(0, (ih + 5 - sr) * sy, startIndex * sx, sy);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fillRect((startIndex + 1) * sx, (ih + 6 - sr) * sy, kw * sx, (sr - 1) * sy);
      } 
    }
  }
}

/* 
        calculate offset:
        # add pattern and locate according to alignment
        pattern = qscene.addPixmap(pixmap)
        machine_width = Machine(self.__prefs.value("machine")).width
        if self.__alignment == Alignment.LEFT:
            pos = self.__start_needle - machine_width / 2
        elif self.__alignment == Alignment.CENTER:
            pos = (self.__start_needle + self.__stop_needle + 1 - pixmap.width() - machine_width) / 2
        elif self.__alignment == Alignment.RIGHT:
            pos = self.__stop_needle + 1 - machine_width / 2 - pixmap.width()
            */
