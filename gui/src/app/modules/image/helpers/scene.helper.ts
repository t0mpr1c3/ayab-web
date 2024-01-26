import { Scale } from '../../toolbar/models/scale.model';
import { SerializedImageData } from '../model/serialized-image-data.model';

export default class SceneHelper {
  static MAX_ZOOM = 8;
  
  static getImageData(imageFile: File): Promise<ImageData|null> {
    // Read image file
    const reader = new FileReader();
    reader.onload = function(e) {
      if (e.target) {
        img.src = (e.target.result || '') as string;
        document.body.appendChild(img);
      }
    }
    reader.readAsDataURL(imageFile);

    // Set up new canvas
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return Promise.resolve(null);
    }
    
    // Create new HTMLImageElement
    const img = new Image();
    img.hidden = true;

    // Get image data
    return new Promise<ImageData>(function(resolve, _) {
      img.onload = () => {
        // Draw image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Get ImageData from HTMLImageElement
        const data = ctx.getImageData(0, 0, img.width, img.height) || { data: [] };

        // Delete new HTML elements
        canvas.remove();
        img.remove();

        // Return promise of SerializedImageData
        resolve(data);
      }
    });
  }
/*
  static loadCanvas(imageData: ImageData): void {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      const ctx = canvas.getContext('2d');
      ctx?.putImageData(imageData, 0, 0); // FIXME set scale appropriate to image size instead of 1
    }
  }

  static async zoomCanvas(imageData: ImageData, scale: Scale): Promise<void> {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const bitmap = await createImageBitmap(imageData);
    if (canvas) {
      canvas.width = imageData.width * scale.x;
      canvas.height = imageData.height * scale.y;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false; // keep pixel perfect
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      }
    }
  }
*/
  static async drawCanvas(imageData: ImageData, scale: Scale = { x: 1, y: 1 }, 
  offset = 0, start = 1, width = 200): Promise<void> {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const bitmap = await createImageBitmap(imageData);
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = (width + 2) * scale.x;
      canvas.height = (imageData.height + 6) * scale.y;
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, (2 + width) * scale.x, 5 * scale.y);
        ctx.fillStyle = "orange";
        ctx.fillRect(scale.x, scale.y, width * scale.x / 2, 3 * scale.y);
        ctx.fillStyle = "green";
        ctx.fillRect(scale.x + width * scale.x / 2, scale.y, width * scale.x / 2, 3 * scale.y);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 5 * scale.y, scale.x, (imageData.height + 5) * scale.y);
        ctx.fillRect((1 + imageData.width) * scale.x, 5 * scale.y, scale.x, (imageData.height + 5) * scale.y);
        ctx.fillRect(0, (imageData.height + 6 - start) * scale.y, (2 + width) * scale.x, scale.y);
        ctx.imageSmoothingEnabled = false; // keep pixel perfect
        ctx.drawImage(bitmap, (1 + offset) * scale.x, 5 * scale.y, imageData.width * scale.x, imageData.height * scale.y);
      } 
    }
  }
  
  static deserialize(image: SerializedImageData): ImageData {
    let view = new Uint8ClampedArray(image.data);
    return new ImageData(view, image.width, image.height);
  }
  
  static serialize(image: ImageData): SerializedImageData {
    return {
      data: Array.from(image.data),
      width: image.width, 
      height: image.height
    }
  }

  // pure transformation
  static transform(data: SerializedImageData, fn: (i: ImageData) => ImageData): SerializedImageData {
    return SceneHelper.serialize( fn ( SceneHelper.deserialize( data )));  
  }
}