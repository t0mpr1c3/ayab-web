import { Scale } from "../models/scale.model";

export default class SceneHelper {
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
        const imgData = ctx.getImageData(0, 0, img.width, img.height) || { data: [] };

        // Delete new HTML elements
        canvas.remove();
        img.remove();

        // Return promise of ImageData
        resolve(imgData);
      }
    });
  }

  static reloadCanvas(imageData: ImageData): void {
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
}