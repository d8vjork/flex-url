import { createFlexUrl } from '../src';
import { expect } from 'chai';

const url = 'http://api.mywebsite.com/'

describe('createFlexUrl', () => {
  it('url parsed and going back to string properly', () => {
    expect(createFlexUrl(url).toString()).to.be.eq(url);
    expect(createFlexUrl('localhost:8000/test').toString()).to.be.eq('localhost:8000/test');
  });

  it('url parser can handle special characters', () => {
    expect(createFlexUrl('localhost:8000/test').addQuery('foo', '🤙').toString()).to.be.eq(encodeURI('localhost:8000/test?foo=🤙'));
  });
  
  it('url parser can handle already encoded urls', () => {
    const preParsedUrl = createFlexUrl('localhost:8000/test?sort=hello,world,-created_at&filter[hello]=foo').toString()

    expect(createFlexUrl(preParsedUrl).toString()).to.be.eq('localhost:8000/test?'+encodeURIComponent('sort')+'='+encodeURIComponent('hello,world,-created_at')+'&'+encodeURIComponent('filter[hello]')+'='+encodeURIComponent('foo'));
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
    
    it('url with sorted foo as asc adding the same attribute using sortByAsc does not duplicate attribute', () => {
      expect(createFlexUrl(url + '?sort=foo').sortByAsc('foo').getSortsAsArray()).to.have.lengthOf(1);
    });

    it('url adding a sort using sortBy does add as ascendant', () => {
      expect(createFlexUrl(url).sortBy('foo').getSortsAsArray()).to.contain('foo');
    });

    it('url adding a sort using sortBy twice twice toggles the sort to descendant', () => {
      expect(createFlexUrl(url).sortBy('foo').sortBy('foo').getSortsAsArray()).to.contain('-foo');
    });
  })

  describe('#clearSorts', () => {
    it('url with sorts removing all of them', () => {
      expect(createFlexUrl(url).sortBy('created-at', 'desc').sortBy('test').clearSorts().getSortsAsArray()).to.be.empty;
    });
  })

  describe('#filterBy', () => {
    it('url adding a filter foo=bar', () => {
      expect(createFlexUrl(url).filterBy('foo', 'bar').hasFilter('foo')).to.be.true;
      expect(createFlexUrl(url).filterBy('foo', 'bar').toString()).to.be.eq(encodeURI(url + '?filter[foo]=bar'));
    });

    it('url adding a filter foo=bar and replace it with foo=test', () => {
      expect(createFlexUrl(url).filterBy('foo', 'bar').filterBy('foo', 'test').hasFilter('foo', 'test')).to.be.true;
      expect(createFlexUrl(url).filterBy('foo', 'bar').filterBy('foo', 'test').toString()).to.be.eq(encodeURI(url + '?filter[foo]=test'));
    });
    
    it('url adding a filter foo=bar and replace with bar OR test', () => {
      const flexUrl = createFlexUrl(url).filterBy('foo', 'bar').filterBy('foo', 'test', false);

      expect(flexUrl.getFilters()).to.contain('foo');
      expect(flexUrl.getQuery('filter[foo]')).to.be.eq('bar,test');
      expect(flexUrl.orFilterBy('foo', 'hello').getQuery('filter[foo]')).to.be.eq('bar,test,hello');
    });
    
    it('adding OR filters with integers over a parsed url', () => {
      const parsedUrl = createFlexUrl(url).filterBy('foo', '1').toString();

      expect(createFlexUrl(parsedUrl).orFilterBy('foo', '2')).to.be.ok;
    });
  })
  
  describe('#getFilters', () => {
    it('url with filters getting all of the attributes filtered as array', () => {
      expect(createFlexUrl(url).filterBy('foo', 'bar').filterBy('bar', 'test').getFilters()).to.have.members(['foo', 'bar']);
    });
  });
  
  describe('#getFiltersAsObject', () => {
    it('url with filters getting all of the attributes filtered as object', () => {
      expect(createFlexUrl(url).query('foo[test]', 'bar').filterBy('foo', 'bar').filterBy('bar', 'test').getFiltersAsObject()).to.be.deep.eq({ foo: 'bar', bar: 'test' });
      expect(createFlexUrl(url).filterBy('foo', 'bar').orFilterBy('foo', 'test').getFiltersAsObject()).to.be.deep.eq({ foo: ['bar', 'test'] });
    });
  });

  describe('#removeFilters', () => {
    it('url with filters removing by key', () => {
      const flexUrl = createFlexUrl(url).query('foo[test]', 'bar').filterBy('foo', 'bar').filterBy('bar', 'test');

      expect(flexUrl.removeFilter('bar').getFilters()).to.contain('foo');
      expect(flexUrl.removeFilter('bar').getQuery()).to.be.eq(encodeURI('?foo[test]=bar&filter[foo]=bar'));
    });
    
    it('url with filters removing by key and value on an OR filter', () => {
      const flexUrl = createFlexUrl(url).query('foo[test]', 'bar').filterBy('foo', 'bar').orFilterBy('foo', 'test');

      expect(flexUrl.removeFilter('foo', 'test').getFiltersAsObject()).to.be.deep.eq({ foo: 'bar' });
      expect(flexUrl.removeFilter('foo', 'test').getQuery()).to.be.eq(encodeURI('?foo[test]=bar&filter[foo]=bar'));
    });
  });

  describe('#clearFilters', () => {
    it('url with filters removing all of them', () => {
      expect(createFlexUrl(url).query('foo[test]', 'bar').filterBy('foo', 'bar').filterBy('bar', 'test').clearFilters().getQuery()).to.be.eq('?foo%5Btest%5D=bar');
    });
    
    it('url with filters removing all of them except one', () => {
      expect(createFlexUrl(url).filterBy('foo', 'bar').filterBy('bar', 'test').clearFilters(['foo']).getQuery()).to.be.eq(encodeURI('?filter[foo]=bar'));
    });
  });
  
  describe('#hasSort', () => {
    it('url with filters removing all of them', () => {
      expect(createFlexUrl(url).sortByDesc('bar').hasSort('bar')).to.be.true;
      expect(createFlexUrl(url).sortBy('bar').sortBy('fo').hasSort('foo')).to.be.false;
    });
  });
});
