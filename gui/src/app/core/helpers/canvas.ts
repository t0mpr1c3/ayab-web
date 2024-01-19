export async function drawCanvas(imageFile: File): Promise<void> {
  console.log(imageFile)
  const img = new Image();
  const reader = new FileReader();
  reader.onload = function(e)  {
    if (e.target) {
      img.src = (e.target.result || '') as string;
      document.body.appendChild(img);
    }
  }
  reader.readAsDataURL(imageFile);

  // Set up canvas
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    // Get image data
    // pixels are in row order from top left
    /*
    ctx.translate(img.height, 0)
    ctx.rotate(90 * Math.PI / 180); // 90 degree closewise rotation
    */
    ctx.drawImage(img, 0, 0);
    const imgContent = [];
    const imgData = ctx.getImageData(0, 0, img.width, img.height) || { data: [] };
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgContent.push(new Uint8Array(imgData.data.slice(i, i + 4)));
    }
    /*
    // Display image data
    const htmlContent = document.getElementById('content');
    if (htmlContent) {
      htmlContent.innerText = imgContent
        .map(x => toHex(x))
        .join(' ')
        .slice(0, 12000) + '...';
    }
    */
    /*
    const htmlTitle = document.getElementById('imageTitle');
    if (htmlTitle && !!imageFile) {
      htmlTitle.innerText = imageFile.name;
      console.log(imageFile)
    }
    */
    // Display image
    const htmlCanvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    htmlCanvas.width = img.width;
    htmlCanvas.height = img.height;
    if (htmlCanvas) {
      const htmlCtx = htmlCanvas.getContext('2d');
      htmlCtx?.putImageData(imgData, img.width, img.height);
    }

    // remove new <img> HTMLElement
    img.remove();
  } 
}

/*
export async function clearCanvas(): Promise<void> {
}
*/

function toHex(buffer: Uint8Array): string {
  return Array.prototype.map.call(buffer, x => ('00' + x.toString(16)).slice(-2)).join('');
}