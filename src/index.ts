import {FlexibleUrl} from './flex-url.js';

export function flexUrl(url?: string | URL | Location) {
  return new FlexibleUrl(url);
}
