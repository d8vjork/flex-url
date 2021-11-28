export function encode(obj: Record<string, any>, prefix = '') {
  var k, i, tmp, str='';

  for (k in obj) {
    if ((tmp = obj[k]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i=0; i < tmp.length; i++) {
          str && (str += '&');
          str += encodeURIComponent(k) + '=' + encodeURIComponent(tmp[i]);
        }
      } else {
        str && (str += '&');
        str += encodeURIComponent(k) + '=' + encodeURIComponent(tmp);
      }
    }
  }

  return (prefix || '') + str;
}

function toValue(mix: string | undefined, tcBools: boolean, tcNumbers: boolean) {
  if (!mix) return '';
  var str = decodeURIComponent(mix);
  if (tcBools && str === 'false') return false;
  if (tcBools && str === 'true') return true;

  return (tcNumbers && +str * 0 === 0) ? (+str) : str;
}

export function decode(str: string, tcBools: boolean, tcNumbers: boolean) {
  let cursor
  let k
  let out: Record<string, any> = {}
  let arr = str.split('&');
  
  tcBools = typeof tcBools !== 'undefined' ? tcBools : true;
  tcNumbers = typeof tcNumbers !== 'undefined' ? tcNumbers : true;

  while (cursor = arr.pop()) {
    cursor = cursor.split('=');
    k = cursor.shift() as string;
    let outt = out[k]

    if (outt !== void 0) {
      out[k] = ([] as Array<string>).concat(outt, toValue(cursor.shift(), tcBools, tcNumbers) as string);
    } else {
      out[k] = toValue(cursor.shift(), tcBools, tcNumbers);
    }
  }

  return out;
}