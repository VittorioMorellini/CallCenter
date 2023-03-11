import { changeDpiDataUrl } from './dpi';
import { resizeHermite } from './hermite';

const BASE64_MARKER = ';base64,';
enum ResizeAlgorithm {
    HERMITE,
    CANVAS,
    CANVAS_SMOOTH
}

export function fromDataUrlToBase64(dataUrl: string) {

    let index = dataUrl.indexOf(BASE64_MARKER);
    if (index !== -1) {
        index += BASE64_MARKER.length;
        
    }

    return dataUrl.substring(index);
}

export function fromBase64ToDataUrl(base64: string, type: string) {

    if (base64.indexOf(BASE64_MARKER) === -1) {
        base64 = `data:image/${type};base64,${base64}`;
    }

    return base64;
}

export function resize(
    base64: string, 
    type: string, 
    callback: (resizedBase64DataUrl: string) => void,
    maxWidthOrHeight?: number,         
    dpi?: number,
    algo: ResizeAlgorithm = ResizeAlgorithm.HERMITE) {

    dpi = dpi ? dpi : 72;
    maxWidthOrHeight = maxWidthOrHeight ? maxWidthOrHeight : 800;     

    let dataUrl = fromBase64ToDataUrl(base64, type);
    base64 = fromDataUrlToBase64(changeDpiDataUrl(dataUrl, dpi));

    console.log('ORIGINAL:', `${(base64.length / 1024).toFixed(0)} KB`);                    

    // tslint:disable-next-line: switch-default
    switch (algo) {
        case ResizeAlgorithm.HERMITE: 
            resizeHermite(base64, type, maxWidthOrHeight, (resizedBase64DataUrl: string) => {

                const resizedBase64 = fromDataUrlToBase64(resizedBase64DataUrl);
                console.log('HERMITE :', `${(resizedBase64.length / 1024).toFixed(0)} KB`);

                callback(resizedBase64);
            });
            break;
        case ResizeAlgorithm.CANVAS: 
            resizeCanvas(base64, type, maxWidthOrHeight, (resizedBase64DataUrl: string) => {

                const resizedBase64 = fromDataUrlToBase64(resizedBase64DataUrl);
                console.log('CANVAS  :', `${(resizedBase64.length / 1024).toFixed(0)} KB`);
                
                callback(resizedBase64);
            });
            break;
        case ResizeAlgorithm.CANVAS_SMOOTH: 
            resizeCanvaSmooth(base64, type, maxWidthOrHeight, (resizedBase64DataUrl: string) => {

                const resizedBase64 = fromDataUrlToBase64(resizedBase64DataUrl);
                console.log('SMOOTH  :', `${(resizedBase64.length / 1024).toFixed(0)} KB`);
                
                callback(resizedBase64);
            });
            break;
    }
}

export function resizeCanvas(base64: string, type: string, max: number, callback: (resized: string) => void) {

    // Create and initialize two canvas
    let canvas = window.document.createElement('canvas');
    let ctx = canvas.getContext('2d')!;
    let canvasCopy = window.document.createElement('canvas');
    let copyContext = canvasCopy.getContext('2d')!;
  
    // Create original image
    let img = document.createElement('img');
    img.onload = () => {        

        // Determine new ratio based on max size
        let ratio = 1;
        if (img.width > max) {
            ratio = max / img.width;
        }

        if (img.height > max) {
            ratio = Math.min(max / img.height, ratio);
        }
    
        // Draw original image in second canvas    
        canvasCopy.width = img.width;
        canvasCopy.height = img.height;    
        copyContext.drawImage(img, 0, 0);
    
        // Copy and resize second canvas to first canvas
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

        callback(canvas.toDataURL(`image/${type}`));
    };

    img.src = `data:image/${type};charset=utf-8;base64,${base64}`;
}

export function resizeCanvaSmooth(base64: string, type: string, max: number, callback: (resized: string) => void) {

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d')!;
    let img = document.createElement('img');
    img.onload = () => {

        ctx.imageSmoothingEnabled = true;
        const m = max !== undefined ? max : 1024;
        let ratio = 1;
        if (img.width > m) {
            ratio = m / img.width;
        }
        if (img.height > m) {
            ratio = Math.min(m / img.height, ratio);
        }
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx.scale(ratio, ratio);
        ctx.drawImage(img, 0, 0);

        callback(canvas.toDataURL(`image/${type}`));
    };

    img.src = `data:image/${type};charset=utf-8;base64,${base64}`;
}