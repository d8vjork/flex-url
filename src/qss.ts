export function encode(obj: Record<string, any>, prefix = '') {
  let k; let i; let tmp; let
    str = '';

  for (k in obj) {
    if ((tmp = obj[k]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i = 0; i < tmp.length; i++) {
          str && (str += '&');
          str += `${encodeURIComponent(k)}=${encodeURIComponent(tmp[i])}`;
        }
      } else {
        str && (str += '&');
        str += `${encodeURIComponent(k)}=${encodeURIComponent(tmp)}`;
      }
    }
  }

  return (prefix || '') + str;
}

function toValue(mix: string | undefined) {
  if (!mix) return '';
  const str = decodeURIComponent(mix);

  return `${str}`;
}

export function decode(str: string) {
  let cursor;
  let k;
  const out: Record<string, any> = {};
  const arr = str.split('&');

  while (cursor = arr.pop()) {
    cursor = cursor.split('=');
    k = cursor.shift() as string;
    const outt = out[k];

    if (outt !== void 0) {
      out[k] = ([] as Array<string>).concat(outt, toValue(cursor.shift()) as string);
    } else {
      out[k] = toValue(cursor.shift());
    }
  }

  return out;
}
