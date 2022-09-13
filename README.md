# react-native-swipeable-deck

A swipe deck for react native in simular style as tinder

## Installation

```sh
npm install react-native-swipeable-deck
```

## Usage

```js
import { SwipeDeck } from "react-native-swipeable-deck";

// ...

  <SwipeDeck
          data={DATA}
          renderNoMoreCards={renderNoMoreCards}
          renderCard={renderCard}
          onSwipeLeft={(item) => onSwipeLeft(item)}
          onSwipeRight={(item) => onSwipeRight(item)}
       />

    const renderCard = (item: SwipeData) =>
  {
    return (
        //Will render one card - place what ever you want the card to look like
    )
  }


  const onSwipeLeft = (item) =>
  {
    //What ever you want to happen on a left card swipe
  };
  const onSwipeRight = (item: SwipeData) =>
  {

    //What ever you want to happen on a right card swipe
  };

  const renderNoMoreCards = () =>
  {
    return (
             //Will render when the deck is empty

    );
  };
```
## Demo

<p float="left">
	<img src="https://github.com/TIKramer/react-native-swipeable-deck/blob/master/screenshots/demo.gif" width="300" height="650">
  
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
