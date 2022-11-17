import { flexUrl } from '../src/index.js';
import { assert, expect } from 'chai';

const baseUrl = 'http://api.mywebsite.com'

describe('URL Parsing', () => {
  it('Passing URL without query should not get any', () => {
    expect(flexUrl(baseUrl).params).to.be.empty
  })

  it('Passing URL with query should get all as a params array', () => {
    const url = flexUrl(`${baseUrl}?filter[hello]=world&foo=bar`)

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(2)
  })

  it('Passing URL with query should serialise with URL encoding', () => {
    const url = flexUrl(`${baseUrl}?filter[hello]=test,world&filter[user.name][equal same]=Rubén Robles&foo=bar`)

    expect(url.toString()).to.be.eq(`${baseUrl}?filter[hello]=test%2Cworld&filter[user.name][equal%20same]=Rub%C3%A9n%20Robles&foo=bar`)
  })

  it('Passing serialised URL from flexURL to flexURL for parsing should serialise as same (🤯)', () => {
    const url = flexUrl(`${baseUrl}?filter[hello]=world&foo=bar`)
    const sameUrl = flexUrl(url.toString())

    expect(url.toString()).to.be.eq(sameUrl.toString())
  })

  it('Passing URL native browser object will parse', () => {
    const nativeUrl = new URL(baseUrl)
    const url = flexUrl(nativeUrl)

    url.queryParam('test').add('hello')

    expect(url.toString()).to.be.eq(`${baseUrl}?test=hello`)
  })

  it('Passing URL with hash fragment respects order when parsing and serialising', () => {
    const nonHashedUrl = `${baseUrl}?filter[hello]=world`
    const hashFragment = '#test'
    const url = flexUrl(`${nonHashedUrl}${hashFragment}`)

    url.queryParam('test').add('hello')

    expect(url.toString()).to.be.eq(`${nonHashedUrl}&test=hello${hashFragment}`)
  })
})

describe('Query Parameters Manipulation', () => {
  it('Set query parameter with empty params returns empty query', () => {
    const url = flexUrl(baseUrl)
      
    url.queryParam('foo').set('bar')
    url.queryParam('foo').set('hello')

    expect(url.params).to.be.empty
    expect(url.toString()).to.be.eq(`${baseUrl}`)
  })

  it('Set query parameter replaces param with new value if one is present', () => {
    const url = flexUrl(baseUrl)
      
    url.queryParam('foo').add('bar')
    url.queryParam('foo').set('hello')

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(1)
    expect(url.toString()).to.be.eq(`${baseUrl}?foo=hello`)
  })
  
  it('Add query parameter with same key adds new parameter to ones already present', () => {
    const url = flexUrl(baseUrl)
      
    url.queryParam('foo').add('bar')
    url.queryParam('foo').add('hello')

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(2)
    expect(url.toString()).to.be.eq(`${baseUrl}?foo=bar&foo=hello`)
  })

  it('Add query parameter with same key and value does not add a new one', () => {
    const url = flexUrl(baseUrl)
      
    url.queryParam('foo').add('bar')
    url.queryParam('foo').add('bar')

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(1)
    expect(url.toString()).to.be.eq(`${baseUrl}?foo=bar`)
  })

  it('Add query parameter with modifiers adds new parameter with all modifiers added', () => {
    const url = flexUrl(baseUrl)
      
    url.queryParam('filter').add('bar', ['foo'])
    url.queryParam('filter').add('hello', ['foo', 'test'])

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(2)
    expect(url.toString()).to.be.eq(`${baseUrl}?filter[foo]=bar&filter[foo][test]=hello`)
  })

  it('Add query parameter then change its modifiers adds modifiers to the added parameter', () => {
    const url = flexUrl(baseUrl)
      
    url.queryParam('filter').add('bar').withModifiers(['foo', 'test'])

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(1)
    expect(url.toString()).to.be.eq(`${baseUrl}?filter[foo][test]=bar`)
  })
  
  it('Toggle query parameter adds new parameter if one not present', () => {
    const url = flexUrl(baseUrl)
    
    url.queryParam('foo').toggle('bar')

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(1)
    expect(url.toString()).to.be.eq(`${baseUrl}?foo=bar`)
  })

  it('Toggle query parameter removes parameter if one present', () => {
    const url = flexUrl(baseUrl)
    
    url.queryParam('foo').add('bar')
    url.queryParam('foo').add('hello')
    url.queryParam('foo').toggle('bar')

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(1)
    expect(url.toString()).to.be.eq(`${baseUrl}?foo=hello`)
  })

  it('Append query parameter adds value to already present parameter', () => {
    const url = flexUrl(baseUrl)
    
    url.queryParam('foo').add('bar').append(',test')
    url.queryParam('foo').add('hello').append(' world')

    expect(url.params).to.not.be.empty
    expect(url.params).to.be.lengthOf(2)
    expect(url.toString()).to.be.eq(`${baseUrl}?foo=bar%2Ctest&foo=hello%20world`)
  })
  
  it('Append query parameter throws error when no previous parameter present', () => {
    const url = flexUrl(baseUrl)
    
    assert.throws(
      () => url.queryParam('foo').append(',hello'),
      'Query parameter value must be provided to append to the right parameter.'
    )

    expect(url.params).to.be.empty
  })

  it('Clear removes all parameters from URL', () => {
    const url = flexUrl(baseUrl)
    
    url.queryParam('foo').add('bar')
    url.queryParam('foo').add('hello,world')

    expect(url.params).to.not.be.empty
    expect(url.toString()).to.be.eq(`${baseUrl}?foo=bar&foo=hello%2Cworld`)
    
    url.clear()

    expect(url.params).to.be.empty
    expect(url.toString()).to.be.eq(baseUrl)
  })
})

describe('Query Parameters Checking', () => {
  it('Has checks query parameter with key and value is present on the URL', () => {
    const url = flexUrl(baseUrl)
    
    url.queryParam('foo').add('bar')

    expect(url.queryParams.has('foo')).to.be.true
    expect(url.queryParams.has('foo', 'bar')).to.be.true
    expect(url.queryParams.has('foo', 'hello')).to.be.false
  })

  it('Has checks query parameter with key and value is not present on the URL', () => {
    const url = flexUrl(baseUrl)

    expect(url.queryParams.has('foo', 'hello')).to.be.false
  })
})

describe('Query Filter Parameters Checking', () => {
  it('Has filter checks query filter parameter with filter key and value is present on the URL', () => {
    const url = flexUrl(baseUrl)
    
    url.filter('foo').add('bar')

    expect(url.filters.has('foo')).to.be.true
    expect(url.filters.has('foo', 'bar')).to.be.true
    expect(url.filters.has('foo', 'hello')).to.be.false
  })
})