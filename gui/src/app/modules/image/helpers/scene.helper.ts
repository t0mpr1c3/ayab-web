import TransformsHelper from './transforms.helper';
import Scale from '../../toolbar/models/scale.model';
import SerializedImageData from '../model/serialized-image-data.model';

// Impure methods to update canvas etc.
export default class SceneHelper {
  static MAX_ZOOM = 8;

  // cache for ImageData objects that correspond to SerializedImageData objects in the State
  static cache = {};
  
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
    // FIXME crop image if it is too wide for the machine
    return new Promise<ImageData>(function(resolve, _) {
      img.onload = () => {
        // Draw image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Get ImageData from HTMLImageElement
        // FIXME cache imageData
        const data = ctx.getImageData(0, 0, img.width, img.height) || { data: [] };

        // Delete new HTML elements
        canvas.remove();
        img.remove();

        // Return promise of SerializedImageData
        resolve(data);
      }
    });
  }

  // FIXME use Scene interface for input
  static async drawCanvas(data: SerializedImageData, scale: Scale = { x: 1, y: 1 }, 
    startRow = 1, offset = 100, width = 200): Promise<void> {
    let imageData = TransformsHelper.deserialize(data); // FIXME use cached imageData
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const bitmap = await createImageBitmap(imageData);
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = (width + 2) * scale.x;
      canvas.height = (imageData.height + 5) * scale.y;
      // Draw machine and image
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, (2 + width) * scale.x, 5 * scale.y);
        ctx.fillStyle = "orange";
        ctx.fillRect(scale.x, scale.y, width * scale.x / 2, 3 * scale.y);
        ctx.fillStyle = "green";
        ctx.fillRect(scale.x + width * scale.x / 2, scale.y, width * scale.x / 2, 3 * scale.y);
        ctx.fillStyle = "black";
        ctx.fillRect(offset * scale.x, 5 * scale.y, scale.x, (imageData.height + 5) * scale.y);
        ctx.fillRect((offset + 1 + imageData.width) * scale.x, 5 * scale.y, scale.x, (imageData.height + 5) * scale.y);
        ctx.fillRect(0, (imageData.height + 5 - startRow) * scale.y, (2 + width) * scale.x, scale.y);
        ctx.imageSmoothingEnabled = false; // keep pixel perfect
        ctx.drawImage(bitmap, (1 + offset) * scale.x, 5 * scale.y, imageData.width * scale.x, imageData.height * scale.y);        
        ctx.fillStyle = "rgba(127, 127, 127, 0.5)";
        ctx.fillRect((offset + 1) * scale.x, (imageData.height + 6 - startRow) * scale.y, imageData.width * scale.x, (startRow - 1) * scale.y);
      } 
    }
  }
}