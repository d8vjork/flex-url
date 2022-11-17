import { createFlexUrl } from '.'
import { flexUrl } from './new-release'

const theSameUrl = 'http://example.org?filter[foo]=bar&filter[foo]=test&filter[hello]=people,world'

// initialisation
const oldFlexUrl = createFlexUrl(theSameUrl)
const newFlexUrl = flexUrl(theSameUrl) // here 'theSameUrl' var is optional

// check filter by key
oldFlexUrl.hasFilter('foo')

newFlexUrl.filters.has('foo')

// check filter by key and value
oldFlexUrl.hasFilter('foo', 'bar')

newFlexUrl.filters.has('foo', 'bar')

// check AND filter by key and values (only possible with FlexUrl v1)
newFlexUrl.filters.has('foo', ['bar', 'test'])
newFlexUrl.filters.and.has('foo', ['bar', 'test']) // alternative

// check OR filter by key and values
oldFlexUrl.hasFilter('hello', 'people,world')

newFlexUrl.filters.has('foo', 'people,world')
newFlexUrl.filters.or.has('foo', ['world', 'people']) // only possible with FlexUrl v1

// add filter
oldFlexUrl.filterBy('name', 'Ruben')

newFlexUrl.filter('name').set('Ruben')

// add AND filters
oldFlexUrl.filterBy('name', 'Ruben').filterBy('name', 'Daniel')

newFlexUrl.filter('name').set('Ruben').and.add('Daniel')

// add OR filters
oldFlexUrl.filterBy('name', 'Ruben').orFilterBy('name', 'Daniel')

newFlexUrl.filter('name').set('Ruben').or.add('Daniel')
