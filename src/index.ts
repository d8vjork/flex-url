import {FlexibleUrl} from './flex-url.js';

export function flexUrl(url?: string | URL) {
  return new FlexibleUrl(url);
}
