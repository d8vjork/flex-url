import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{r as n,o as l,c as d,a as e,b as a,w as s,d as i,e as o}from"./app.7cb89187.js";const c={},u=e("h1",{id:"api",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#api","aria-hidden":"true"},"#"),i(" API")],-1),v=e("p",null,"All methods available from this library to use on your applications.",-1),m=e("hr",null,null,-1),b={class:"table-of-contents"},p=i("Constructor"),h=i("getQuery"),f=i("hasQuery"),y=i("query"),x=i("addQuery"),g=i("setQuery"),_=i("removeQuery"),w=i("filterBy"),F=i("hasFilter"),U=i("clearFilters"),q=i("toString"),j=o(`<h3 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor" aria-hidden="true">#</a> Constructor</h3><p>The constructor accepts a host and params (optional):</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { FlexUrl } from &#39;flex-url&#39;;

new FlexURL(&#39;my.website.com&#39;)
// my.website.com

new FlexURL(&#39;my.website.com&#39;, { test: &#39;foo&#39; })
// my.website.com?test=foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="getquery" tabindex="-1"><a class="header-anchor" href="#getquery" aria-hidden="true">#</a> getQuery</h3><p>Gets the whole query part of the URL or just the value of one param, accepts an optional key as unique parameter:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com?foo=bar&#39;).getQuery()
// returns: &#39;?foo=bar&#39;

createFlexUrl(&#39;http://api.mywebsite.com?foo=bar&#39;).getQuery(&#39;foo&#39;)
// returns: &#39;bar&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hasquery" tabindex="-1"><a class="header-anchor" href="#hasquery" aria-hidden="true">#</a> hasQuery</h3><p>Checks that the query param exists by key and value (optional):</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com?foo=bar&#39;).hasQuery(&#39;foo&#39;)
// returns true

createFlexUrl(&#39;http://api.mywebsite.com?foo=bar&#39;).hasQuery(&#39;foo&#39;, &#39;bar&#39;)
// returns true

createFlexUrl(&#39;http://api.mywebsite.com?foo=bar&#39;).hasQuery(&#39;foo&#39;, &#39;test&#39;)
// returns false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="query" tabindex="-1"><a class="header-anchor" href="#query" aria-hidden="true">#</a> query</h3><p>Modify or add a query&#39;s key/value:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com&#39;).query(&#39;foo&#39;).toString()
// returns &#39;http://api.mywebsite.com?foo=&#39;

createFlexUrl(&#39;http://api.mywebsite.com&#39;).query(&#39;foo&#39;, &#39;bar&#39;).toString()
// returns &#39;http://api.mywebsite.com?foo=bar&#39;

createFlexUrl(&#39;http://api.mywebsite.com?foo=bar&#39;).query(&#39;foo&#39;, &#39;test&#39;, &#39;add&#39;)
// returns &#39;http://api.mywebsite.com?foo=bar&amp;foo=test&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="addquery" tabindex="-1"><a class="header-anchor" href="#addquery" aria-hidden="true">#</a> addQuery</h3><p>Same as <code>query(key, value, &#39;add&#39;)</code>, adds a value even if its repeated on the query params:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com?foo=bar&#39;).addQuery(&#39;foo&#39;).toString()
// returns &#39;http://api.mywebsite.com?foo=bar&amp;foo=&#39;

createFlexUrl(&#39;http://api.mywebsite.com?foo=bar&#39;).addQuery(&#39;foo&#39;, &#39;test&#39;).toString()
// returns &#39;http://api.mywebsite.com?foo=bar&amp;foo=test&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="setquery" tabindex="-1"><a class="header-anchor" href="#setquery" aria-hidden="true">#</a> setQuery</h3><p>Same as <code>query(key, value, &#39;set&#39;)</code> or <code>query(key, value)</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com&#39;).setQuery(&#39;foo&#39;).toString()
// returns &#39;http://api.mywebsite.com?foo=&#39;

createFlexUrl(&#39;http://api.mywebsite.com?foo=&#39;).setQuery(&#39;foo&#39;, &#39;bar&#39;).toString()
// returns &#39;http://api.mywebsite.com?foo=bar&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="removequery" tabindex="-1"><a class="header-anchor" href="#removequery" aria-hidden="true">#</a> removeQuery</h3><p>Removes a query parameter by key and value (optional, if provided it will only delete the parameter with this value):</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com?foo=test&amp;foo=bar&#39;).removeQuery(&#39;foo&#39;).toString()
// returns &#39;http://api.mywebsite.com&#39;

createFlexUrl(&#39;http://api.mywebsite.com?foo=test&amp;foo=bar&#39;).removeQuery(&#39;foo&#39;, &#39;test&#39;).toString()
// returns &#39;http://api.mywebsite.com?foo=bar&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="filterby" tabindex="-1"><a class="header-anchor" href="#filterby" aria-hidden="true">#</a> filterBy</h3><p>Sets a filter by attribute and value, this is useful for JSON:API like endpoints:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com&#39;).filterBy(&#39;foo&#39;, &#39;bar&#39;).toString()
// returns &#39;http://api.mywebsite.com/?filter%5Bfoo%5D=bar&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hasfilter" tabindex="-1"><a class="header-anchor" href="#hasfilter" aria-hidden="true">#</a> hasFilter</h3><p>Checks if the URL has applied a filter with key and value (optional):</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com/?filter%5Bfoo%5D=bar&#39;).hasFilter(&#39;foo&#39;)
// returns true

createFlexUrl(&#39;http://api.mywebsite.com/?filter%5Bfoo%5D=bar&#39;).hasFilter(&#39;foo&#39;, &#39;bar&#39;)
// returns true

createFlexUrl(&#39;http://api.mywebsite.com/?filter%5Bfoo%5D=bar&#39;).hasFilter(&#39;foo&#39;, &#39;test&#39;)
// returns false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clearfilters" tabindex="-1"><a class="header-anchor" href="#clearfilters" aria-hidden="true">#</a> clearFilters</h3><p>Remove filters with the exception of the ones sent as first parameter as array of attribute names (optional):</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>import { createFlexUrl } from &#39;flex-url&#39;;

createFlexUrl(&#39;http://api.mywebsite.com/?filter%5Bfoo%5D=bar&amp;filter%5Btest%5D=bar&#39;).clearFilters().toString()
// returns &#39;http://api.mywebsite.com/

createFlexUrl(&#39;http://api.mywebsite.com/?filter%5Bfoo%5D=bar&amp;filter%5Btest%5D=bar&#39;).clearFilters([&#39;foo&#39;]).toString()
// returns &#39;http://api.mywebsite.com/?filter%5Bfoo%5D=bar&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tostring" tabindex="-1"><a class="header-anchor" href="#tostring" aria-hidden="true">#</a> toString</h3><p>Formats the URL back to string.</p>`,32);function Q(S,k){const r=n("RouterLink");return l(),d("div",null,[u,v,m,e("nav",b,[e("ul",null,[e("li",null,[a(r,{to:"#constructor"},{default:s(()=>[p]),_:1})]),e("li",null,[a(r,{to:"#getquery"},{default:s(()=>[h]),_:1})]),e("li",null,[a(r,{to:"#hasquery"},{default:s(()=>[f]),_:1})]),e("li",null,[a(r,{to:"#query"},{default:s(()=>[y]),_:1})]),e("li",null,[a(r,{to:"#addquery"},{default:s(()=>[x]),_:1})]),e("li",null,[a(r,{to:"#setquery"},{default:s(()=>[g]),_:1})]),e("li",null,[a(r,{to:"#removequery"},{default:s(()=>[_]),_:1})]),e("li",null,[a(r,{to:"#filterby"},{default:s(()=>[w]),_:1})]),e("li",null,[a(r,{to:"#hasfilter"},{default:s(()=>[F]),_:1})]),e("li",null,[a(r,{to:"#clearfilters"},{default:s(()=>[U]),_:1})]),e("li",null,[a(r,{to:"#tostring"},{default:s(()=>[q]),_:1})])])]),j])}var R=t(c,[["render",Q],["__file","usage.html.vue"]]);export{R as default};
