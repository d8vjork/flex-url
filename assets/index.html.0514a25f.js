import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{r as n,o as r,c as s,a as d,b as l,w as t,d as e,e as o}from"./app.7cb89187.js";const c={},u=e("::: tip More usage in details at "),v=e("Using the library"),m=e(" :::"),h=o(`<h1 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h1><p>Install with the following command:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yarn add flex-url
# or
npm i flex-url
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting started</h2><h3 id="browser" tabindex="-1"><a class="header-anchor" href="#browser" aria-hidden="true">#</a> Browser</h3><p>And for a basic usage of this library you can do the following example:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

var url = &#39;http://api.mywebsite.com/&#39;;

url = createFlexUrl(url).sortByDesc(&#39;bar&#39;).sortBy(&#39;foo&#39;).toString();

console.log(url)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs" aria-hidden="true">#</a> NodeJS</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>const { createFlexUrl } = require(&#39;flex-url&#39;);

let url = &#39;http://api.mywebsite.com/&#39;;

url = createFlexUrl(url).sortByDesc(&#39;bar&#39;).sortBy(&#39;foo&#39;).toString();

console.log(url)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function b(p,g){const i=n("RouterLink");return r(),s("div",null,[d("p",null,[u,l(i,{to:"/guide/usage.html"},{default:t(()=>[v]),_:1}),m]),h])}var _=a(c,[["render",b],["__file","index.html.vue"]]);export{_ as default};
