const hRange = [0, 360];
const sRange = [0, 100];
const lRange = [0, 100];

const getHashOfString = (str: string) => {
  const charArray = Array.from(str);
  return charArray.reduce((total, _char, index) => {
    return total += str.charCodeAt(index);
  }, 0);
}

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};

export const generateColorByName = (name: string) => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);

  const originalHslAsRgb = hslToRgb(h, s, l);
  const l1 = relativeLuminance(originalHslAsRgb);
  const contrastRgb = rgbFromHslContrast(h, s, l1, 3.5)

  return {
    outputHSL: `hsl(${h}, ${s}%, ${l}%)`,
    contrastRGB: `rgb(${contrastRgb[0]}, ${contrastRgb[1]}, ${contrastRgb[2]})`
  };
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h: number, s: number, l: number){
  let r, g, b;

  if(s == 0){
    r = g = b = l; // achromatic
  }else{
    let hue2rgb = function hue2rgb(p: number, q: number, t: number){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Relative luminance calculations
function adjustGamma(p: number) {
  if (p <= 0.03928) {
    return p / 12.92;
  } else {
    return Math.pow( ( p + 0.055 ) / 1.055, 2.4 );
  }
}

function relativeLuminance(rgb: number[]) {
  const r = adjustGamma( rgb[0] / 255 );
  const g = adjustGamma( rgb[1] / 255 );
  const b = adjustGamma( rgb[2] / 255 );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Contrast calculations
function contrastRatio(a: number, b: number) {
  const ratio = (a + 0.05) / (b + 0.05);
  return ratio >= 1 ? ratio : 1 / ratio;
}

// Loop for correct lightness
function rgbFromHslContrast(h: number, s: number, l1: number, ratio: number) {
  let inc = -0.01;
  let l2 = ( ( l1 + 0.05 ) / ratio - 0.05 );
  if (l2 < 0) {
    l2 = ( ratio * ( l1 + 0.05 ) - 0.05 );
    inc = -inc;
  }
  while (contrastRatio(l1, relativeLuminance(hslToRgb(h, s, l2))) < ratio) {
    l2 += inc;
  }
  return hslToRgb(h, s, l2);
}
