# react-native-swipeable-deck

A swipe deck for react native in simular style as tinder

## Getting started 👨‍🏫


npm install react-native-swipeable-deck

or

yarn add @ react-native-swipeable-deck


## Usage
### Import 

```javascript
import { SwipeDeck } from "react-native-swipeable-deck";
```

// ...
### Example
Adding the component:
```js

  <SwipeDeck
          data={DATA}
          renderNoMoreCards={renderNoMoreCards}
          renderCard={renderCard}
          onSwipeLeft={(item) => onSwipeLeft(item)}
          onSwipeRight={(item) => onSwipeRight(item)}
       />
```
### Props

#### deck
  An array of data that is to be used for the swipeable deck.
  Each element in the deck is passed to renderCard, onSwipeLeft, onSwipeRight
  
#### renderCard(item)
Will render one card - here is where you create the component and styling of a single card.
   
#### onSwipeLeft(item) 
What ever you want to happen on a left card swipe
  
#### onSwipeRight(item) 
What ever you want to happen on a right card swipe
    
#### renderNoMoreCards
Here create component that is to be render when the user reaches the end of the deck
 

## Demo

<p float="left">
	<img src="https://github.com/TIKramer/react-native-swipeable-deck/blob/master/screenshots/demo.gif" width="300" height="650">
  
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
