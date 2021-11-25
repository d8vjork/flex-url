import { createFlexUrl } from '..';
import { expect } from 'chai';

const url = 'http://api.mywebsite.com/'

describe('createFlexUrl', () => {
  it('url parsed and to string properly going back', () => {
    expect(createFlexUrl(url).toString()).to.be.eq(url);
  });
});

describe('FlexUrl', () => {
  describe('#hasQuery', () => {
    it('url with "?foo=" query param has query param with key', () => {
      expect(createFlexUrl(url + '?foo=').hasQuery('foo')).to.be.true;
      expect(createFlexUrl(url + '?foo=').hasQuery('bar')).to.be.false;
    });
    
    it('url with "?foo=bar" query param has query param with key & value', () => {
      expect(createFlexUrl(url + '?foo=bar').hasQuery('foo', 'bar')).to.be.true;
      expect(createFlexUrl(url + '?foo=bar').hasQuery('foo', 'test')).to.be.false;
    });
  })

  describe('#hasQuery', () => {
    it('url with "?foo=" query param has query param with key', () => {
      expect(createFlexUrl(url + '?foo=').hasQuery('foo')).to.be.true;
      expect(createFlexUrl(url + '?foo=').hasQuery('bar')).to.be.false;
    });
    
    it('url with "?foo=bar" query param has query param with key & value', () => {
      expect(createFlexUrl(url + '?foo=bar').hasQuery('foo', 'bar')).to.be.true;
      expect(createFlexUrl(url + '?foo=bar').hasQuery('foo', 'test')).to.be.false;
    });
  })

  describe('#setQuery', () => {
    it('url without query params setting two params', () => {
      expect(createFlexUrl(url).query('foo').query('foo', 'bar').hasQuery('foo', 'bar')).to.be.true;
      expect(createFlexUrl(url).setQuery('foo').setQuery('foo', 'bar').toString()).to.be.eq(url + '?foo=bar');
      expect(createFlexUrl(url).setQuery('bar', 'foo').setQuery('bar').hasQuery('foo')).to.be.false;
    });
  })
    
  describe('#addQuery', () => {
    it('url without query params adding two params', () => {
      expect(createFlexUrl(url).query('foo', '', 'add').query('foo', 'bar', 'add').hasQuery('foo')).to.be.true;
      expect(createFlexUrl(url).addQuery('foo').addQuery('foo', 'bar').toString()).to.be.eq(url + '?foo=&foo=bar');
      expect(createFlexUrl(url).addQuery('foo').addQuery('foo', 'bar').hasQuery('foo', 'bar')).to.be.true;
    });
  })
  
  describe('#removeQuery', () => {
    it('url with query params foo=bar & foo=test removing all foo params', () => {
      const flexUrl = createFlexUrl(url).addQuery('foo', 'bar').addQuery('foo', 'test').removeQuery('foo');

      expect(flexUrl.getQuery()).to.be.empty;
      expect(flexUrl.toString()).to.be.eq(url);
    });
    
    
    it('url with query params foo=bar & foo=test removing foo params with test value', () => {
      const flexUrl = createFlexUrl(url).addQuery('foo', 'bar').addQuery('foo', 'test').removeQuery('foo', 'test');

      expect(flexUrl.getQuery()).to.be.eq('?foo=bar');
      expect(flexUrl.toString()).to.be.eq(url + '?foo=bar');
    });
  })
  
  describe('#sortBy', () => {
    it('url without sorts adding a sortBy created-at as descendant', () => {
      expect(createFlexUrl(url).sortBy('created-at', 'desc').getSorts(false)).to.contain('-created-at');
      expect(createFlexUrl(url).sortByDesc('created-at').getSorts(true)).to.be.deep.eq({
        'created-at': 'desc'
      });
      expect(createFlexUrl(url).sortByDesc('created-at').toString()).to.be.eq(url + '?sort=-created-at');
      // expect(createFlexUrl(url).addQuery('foo').addQuery('foo', 'bar').hasQuery('foo', 'bar')).to.be.true;
    });
    
    it('url adding a sort using sortBy does add as ascendant', () => {
      expect(createFlexUrl(url).sortBy('foo').getSortsAsArray()).to.contain('foo');
    });

    it('url adding a sort using sortBy twice twice toggles the sort to descendant', () => {
      expect(createFlexUrl(url).sortBy('foo').sortBy('foo').getSortsAsArray()).to.contain('-foo');
    });
  })

  describe('#filterBy', () => {
    it('url adding a filter using filterBy foo=bar', () => {
      expect(createFlexUrl(url).filterBy('foo', 'bar').hasFilter('foo')).to.be.true;
      expect(createFlexUrl(url).filterBy('foo', 'bar').toString()).to.be.eq(encodeURI(url + '?filter[foo]=bar'));
    });

    it('url adding a filter using filterBy foo=bar and replace it with foo=test', () => {
      expect(createFlexUrl(url).filterBy('foo', 'bar').filterBy('foo', 'test').hasFilter('foo', 'test')).to.be.true;
      expect(createFlexUrl(url).filterBy('foo', 'bar').filterBy('foo', 'test').toString()).to.be.eq(encodeURI(url + '?filter[foo]=test'));
    });
  })
});