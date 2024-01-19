export default class TransformsHelper {
  static flatten3d(arr: Uint8ClampedArray[][], length: number, width: number, height: number): ImageData {
    let data = new Uint8ClampedArray(length);
    for (let y = 0, j = 0; y < height; y += 1, j += width * 4) {
      for (let x = 0, i = 0; x < width; x += 1, i += 4) {
        data.set(arr[y]![x]!, i + j);
      }
    }
    return new ImageData(data, width, height);
  }
  
  static hflipImage = (img: ImageData): ImageData => {
    // Convert to 3D array, reversing each row
    let data = Array<Array<Uint8ClampedArray>>(img.height);
    for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
      let row = Array<Uint8ClampedArray>(img.width);
      for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
        row[img.width - x - 1] = img.data.slice(i + j, i + j + 4);
      }
      data[y] = row;
    }
    // Return flattened data
    return this.flatten3d(data, img.data.length, img.width, img.height);
  }
  
  static invertImage = (img: ImageData): ImageData => {
    let data: Uint8ClampedArray = img.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i + 0] = 0xFF - data[i + 0]!;
      data[i + 1] = 0xFF - data[i + 1]!;
      data[i + 2] = 0xFF - data[i + 2]!;
    }
    return new ImageData(data, img.width, img.height);
  }
  
  static rotateLeftImage = (img: ImageData): ImageData => {
    // Convert to 3D array, transposing rows and columns, reversing rows
    let data = Array<Array<Uint8ClampedArray>>(img.width);
    for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
      let column = Array<Uint8ClampedArray>(img.width);
      for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
        column[y] = img.data.slice(i + j, i + j + 4);
      }
      data[img.width - x - 1] = column;
    }
    // Return flattened data
    return this.flatten3d(data, img.data.length, img.height, img.width);
  }
  
  static rotateRightImage = (img: ImageData): ImageData => {
    // Convert to 3D array, transposing rows and columns, reversing columns
    let data = Array<Array<Uint8ClampedArray>>(img.width);
    for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
      let column = Array<Uint8ClampedArray>(img.width);
      for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
        column[img.height - y - 1] = img.data.slice(i + j, i + j + 4);
      }
      data[x] = column;
    }
    // Return flattened data
    return this.flatten3d(data, img.data.length, img.height, img.width);
  }

  static reflect(left: boolean, right: boolean, top: boolean, bottom: boolean, ) {
    return (img: ImageData): ImageData => {
      console.log('mirrors:')
      console.log(left)
      console.log(right)
      console.log(top)
      console.log(bottom)
      // Convert to 3D array, multiplying each row and column
      let xscale = +left + +right  + 1;
      let yscale = +top  + +bottom + 1;
      let u = left ? img.width : 0;
      let v = top ? img.height : 0;
      let data = Array<Array<Uint8ClampedArray>>(img.height * yscale);
      for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
        let row = Array<Uint8ClampedArray>(xscale * img.width * 4);
        for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
          let slice = img.data.slice(i + j, i + j + 4);
          if (left) {
            row[img.width - x - 1] = slice;
          }
          row[x + u] = slice;
          if (right) {
            row[2 * img.width - x + u - 1] = slice;
          }
        }
        if (top) {
          data[img.height - y - 1] = row;
        }
        data[y + v] = row;
        if (bottom) {
          data[2 * img.height - y + v - 1] = row;
        }
      }
      // Return flattened data
      return this.flatten3d(
        data, 
        img.data.length * xscale * yscale, 
        img.width * xscale, 
        img.height * yscale);
    }
  }

  static repeat(xrepeat: number, yrepeat: number) {
    return (img: ImageData): ImageData => {
      // Convert to 3D array, multiplying each row and column
      let data = Array<Array<Uint8ClampedArray>>(img.height * yrepeat);
      for (let v = 0; v < yrepeat; v += 1) {
        for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
          let row = Array<Uint8ClampedArray>(xrepeat * img.width * 4);
          for (let u = 0; u < xrepeat; u += 1) {
            for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
              row[x + u * img.width] = img.data.slice(i + j, i + j + 4);
            }
          }
          data[y + v * img.height] = row;
        }
      }
      // Return flattened data
      return this.flatten3d(
        data, 
        img.data.length * xrepeat * yrepeat, 
        img.width * xrepeat, 
        img.height * yrepeat);
    }
  }

  static stretch(xstretch: number, ystretch: number) {
    return (img: ImageData): ImageData => {
      // Convert to 3D array, multiplying each row and column
      let data = Array<Array<Uint8ClampedArray>>(img.height * ystretch);
      for (let y = 0, j = 0; y < img.height * ystretch; y += ystretch, j += img.width * 4) {
        let row = Array<Uint8ClampedArray>(img.width * xstretch);
        for (let x = 0, i = 0; x < img.width * xstretch; x += xstretch, i += 4) {
          for (let k = 0; k < xstretch; k += 1) {
            row[x + k] = img.data.slice(i + j, i + j + 4);
          }
        }
        for (let k = 0; k < ystretch; k += 1) {
          data[y + k] = row;
        }
      }
      // Return flattened data
      return this.flatten3d(
        data, 
        img.data.length * xstretch * ystretch, 
        img.width * xstretch, 
        img.height * ystretch);
    }
  }
  
  static vflipImage = (img: ImageData): ImageData => {
    // Convert to 2D array, reversing order of rows
    let data = Array<Uint8ClampedArray>(img.height);
    for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
      data[img.height - y - 1] = img.data.slice(j, j + img.width * 4);
    }
    // Return flattened data
    let res = new Uint8ClampedArray(img.data.length);
    for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
      res.set(data[y]!, j);
    }
    return new ImageData(res, img.width, img.height);
  }
}