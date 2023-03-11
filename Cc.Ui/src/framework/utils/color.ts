interface HSL {
    h?: number;
    s?: number;
    l?: number;
}

export function toHSL(hex: string, delta?: HSL, override?: HSL) {
    var result: any = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255;
    g /= 255; 
    b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var diff = max - min;
        s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
        // tslint:disable-next-line:switch-default
        switch (max) {
            case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
            case g: h = (b - r) / diff + 2; break;
            case b: h = (r - g) / diff + 4; break;
        }

        h /= 6;
    }

    let o = override || { };
    let d = delta || { h: 0, s: 0, l: 0 };
    d.h = d.h || 0;
    d.s = d.s || 0;
    d.l = d.l || 0;

    h = o.h || (h * 360);
    h = Math.max(0, Math.min(360, Math.round(h + d.h)));
    s = o.s || (s * 100);
    s = Math.max(0, Math.min(100, Math.round(s + d.s)));
    l = o.l || (l * 100);
    l = Math.max(0, Math.min(100, Math.round(l + d.l)));

    return `hsl(${h}, ${s}%, ${l}%)`;
}

export function toRGBA(hex: string, alpha?: number) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m: any, r: any, g: any, b: any) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let color: any =  result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;

    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha || 1}`;
}