export async function drawCanvas(imageFile: File): Promise<void> {
  // Demo image
  const img = new Image(33, 32);
  img.src = '/assets/img/spaceinvader_33x32.png';

  // Set up canvas
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  img.onload = () => {
    // Get image data
    // pixels are in row order from top left
    const imgContent = [];
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, img.width, img.height) || { data: [] };
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgContent.push(new Uint8Array(imgData.data.slice(i, i + 4)));
    }

    // Display image data
    const htmlContent = document.getElementById('content');
    if (htmlContent) {
      htmlContent.innerText = imgContent
        .map(x => toHex(x))
        .join(' ')
        .slice(0, 12000) + '...';
    }

    // Display image
    const htmlTitle = document.getElementById('imageTitle');
    if (htmlTitle && !!imageFile) {
      htmlTitle.innerText = imageFile.name;
      console.log(imageFile)
    }
    const htmlCanvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    htmlCanvas.width = img.width;
    htmlCanvas.height = img.height;
    if (htmlCanvas) {
      const htmlCtx = htmlCanvas.getContext('2d');
      htmlCtx?.putImageData(imgData, 0, 0);
    }
  } 
}

/*
export async function clearCanvas(): Promise<void> {
}
*/

function toHex(buffer: Uint8Array): string {
  return Array.prototype.map.call(buffer, x => ('00' + x.toString(16)).slice(-2)).join('');
}