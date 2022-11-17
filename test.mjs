import { flexUrl } from './dist/index.mjs';

// ============
// Initial idea
// ============

// console.log(parse('localhost:8000/test?foo=bar'));

// ============
// Initial idea
// ============

// let url = 'localhost:8000/sss?foo=bar';

// let regex = /(?:https?:\/\/)?(?:[^?\/\s]+[?\/])(.*)/;

// console.log(regex.exec(url))

// ============
// Actual testing
// ============

const url = flexUrl(new URL('https://example.org/?filter[hello]=world#test'))

url.queryParam('test').add('hello')

console.log(url.toString())

// url.queryParam('filter').add('Ruben', ['name']).add('Daniel', ['name']).add('Ruben', ['name']).append(',Daniel')

// // console.log({ params: url.query.map(param => param.modifiers) })


// console.log(url.queryParams.hasFilter('name', 'Daniel'))
// console.log(url.toString())

// // Multiple ways to do the same thing!
// url.queryParam('filter').withModifiers('name').toggle('Daniel')
// url.queryParam('filter').toggle('Daniel', ['name'])
// url.queryParams.asFilter('name').toggle('Daniel')
// url.filter('name').toggle('Daniel')

// url.queryParams.has()
// console.log(url.queryParams.hasFilter('name', 'Daniel'))
// console.log(url.queryParams.hasFilter('foo', 'bar'))

// console.log(url.toString())

// let url = createFlexUrl('http://localhost:8000/wp-spinnaker/processes?filter%5Blabels.id%5D=5&filter%5Blabels.id%5D=4')

// console.log(url.replaceFilter('labels.id', '5', '1').getFiltersAsObject())
// console.log(url.filterBy('labels.id', '2').orFilterBy('labels.id', '1').toString())
// let url = 'localhost:8000/?' + encodeURIComponent('foo=bar');

// console.log(createFlexUrl(url).getFiltersAsObject())
// console.log(createFlexUrl(url).sortByAsc('created_at').toString())
// console.log(createFlexUrl(url).sortByDesc('created_at').toString())
// console.log(createFlexUrl(url).hasSort('created_at'))

// url = 'localhost:8000/test';

// console.log(createFlexUrl(url).toString())

// console.log(createFlexUrl(url).orFilterBy('test', '4').params)
// console.log(createFlexUrl(url).filterBy('name', 'bbb').orFilterBy('name', 'test').getQuery())
// console.log(createFlexUrl(url).clearFilters(['name']).getFilters())


// ============
// Benchmarks!!!
// ============

// const url = faker.internet.url() + `?filter[foo]=${faker.internet.domainWord()}` + `&foo=${faker.internet.domainWord()}`;

// const suite = new Benchmark.Suite;

// suite.add('createFlexUrl', function() {
//   createFlexUrl(url)
// })
// .add('url-parse', function() {
//   parse(url)
// })
// .add('URL (built-in)', function() {
//   new URL(url)
// })
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// .run({ async: true });
