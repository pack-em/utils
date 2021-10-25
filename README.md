# Utils

A collection of useful tools I often use.

## List

## randomColor
### use it like this
```javascript
import { randomColor } from '@zelaznogydna/utils'

const myColor = randomColor() // --> #fffe33 (some random color)
```
## scrollRefIntoView
### use it like this
Pass an object with a property named "current" that is a valid DOM element instance.  
*Compatible with React's useRef() hook*
```javascript
import { scrollRefIntoView } from '@zelaznogydna/utils'
import { useRef } from 'react'

const someRef = useRef()

if(condition) scrollRefIntoView(someRef) // ---> will scroll upon condition === true
```

## isInView
### use it like this
Pass an object with a property named "current" that is a valid DOM element instance.  
*Compatible with React's useRef() hook*
```javascript
import { isInView, scrollRefIntoView } from '@zelaznogydna/utils'
import { useRef } from 'react'

const someRef = useRef()

if(!isInView(someRef)) scrollRefIntoView(someRef) // ---> will scroll when element is not yet seen
``````

## mapIntoObject
Get an object given an array of objects like ```{ id: 1238 }``` with an id property.

### use it like this
```javascript
import { mapIntoObject } from '@zelaznogydna/utils'

const a = [{
  id:   1233,
  name: 'felipe',
}, {
  id:   3223,
  name: 'poey',
}]

const newA = mapIntoObject(a) 
/*--- newA = {
        1233: {
          id: 1233,
          name: 'felipe',
        }
        ...
      }
```

## toTitleCase
### use it like this

```javascript
import { toTitleCase } from '@zelaznogydna/utils'

console.log(toTitleCase("felipe poey")) // --->> Felipe Poey
```

## setupPageBlock

```javascript
/**
 * @param {boolean} active - Blocked when active is true
 * @param {{avoidBack: boolean, onBack: ()=>{}}} options - If avoidBack is in true intercepts browser's back navigation, pass a callback for onBack() to execute.
 * 
 *  setupPageBlock = (active, {avoidBack = true, onBack} = {})
 */
```
### use it like this
```javascript
import { setupPageBlock } from '@zelaznogydna/utils'
import { useEffect } from 'react'

  useEffect(() => {
    setupPageBlock(state.isDirty, { onBack: actions.cancel })
  }, [state.isDirty])
```