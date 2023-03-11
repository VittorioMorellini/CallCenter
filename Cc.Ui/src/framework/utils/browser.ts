import moment from "moment";

export function isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function isFirefox() {
    return /Firefox/.test(navigator.userAgent);
}

export function isIEorEdge() {
    return window.navigator && window.navigator.clipboard;
}

export function hasBrowserPdfPlugin() {
    return (navigator.mimeTypes as any)['application/pdf'] || isIos() || isFirefox();
}

export function convertBase64StringToBlob(src: string, type: string = 'application/pdf') {

    const byteCharacters = atob(src);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type });

    return URL.createObjectURL(blob);
}

export function convertBase64ToUint8Array(src: string) {

    return new Uint8Array(Buffer.from(src, 'base64'));
}

export function createObjectURL(byteArray: Uint8Array, type: string = 'application/pdf') {

    const blob = new Blob([byteArray], { type });
    return URL.createObjectURL(blob);
}

export function convertArrayToBase64(arrayBuffer: ArrayBuffer) {

    return btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

export function downloadBase64File(base64: string, filename: string, type: string = 'application/pdf') {

    let byteArray = convertBase64ToUint8Array(base64);
    const url = createObjectURL(byteArray, type);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    
    link.click();
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
    }, 2000);
}

export function downloadFile(byteArray: Uint8Array | string, filename: string, type: string = 'application/pdf') {

    byteArray = typeof byteArray === 'string' ? convertBase64ToUint8Array(byteArray) : byteArray;
    const url = createObjectURL(byteArray, type);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    
    link.click();
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
    }, 2000);
}

export function downloadFileFromUrl(url: string, filename: string) {

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    
    link.click();
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
    }, 2000);
}

export function downloadCsv(byteArray: Uint8Array, filename: string, addTimestamp: boolean = true) {

    let name = filename;
    name = addTimestamp ? name + `-${moment().format('YYYYMMDD')}` : '';
    downloadFile(byteArray, `${name}.csv`, 'application/text');
}

export function openFile(byteArray: Uint8Array, type: string = 'application/pdf') {

    const url = createObjectURL(byteArray, type);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    
    link.click();
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
    }, 2000);
}

export function convertFileToBase64(file: File): Promise<string> {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(convertArrayToBase64(reader.result as ArrayBuffer));
        reader.onerror = error => reject(error);
    });
}

export function convertFileToArrayBuffer(file: File) {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = error => reject(error);
    });
}

