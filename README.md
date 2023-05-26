# react-native-swipeable-deck

Inspired by the popular Tinder app's card swiping feature, SwipeDeck allows you to implement a similar style of user interaction, where users can effortlessly swipe left or right to navigate through a stack of cards.

With SwipeDeck, you have full control over customizing the appearance and behavior of the cards in your deck. You can define the rendering of individual cards, handle swipe actions, and adjust properties such as swipe threshold, animation duration, card indentation, initial rotation, and more. This flexibility makes SwipeDeck suitable for a wide range of applications.

## Demo

<p float="left">
	<img src="https://github.com/TIKramer/react-native-swipeable-deck/blob/master/screenshots/demo.gif" width="300" height="650">

## Getting started 👨‍🏫

To install the library, you can use either npm or yarn:

```shell

npm install react-native-swipeable-deck
```

or

```shell

yarn add @ react-native-swipeable-deck
```

## Import

```javascript
import { SwipeDeck } from 'react-native-swipeable-deck';
```

## Props

### renderCard (required)

A function that renders the individual card components. It receives an item from the `data` prop and should return a React node.

### data (required)

An array of items that represent the data for each card.

### onSwipeRight:

A callback function that is called when a card is swiped to the right. It receives the item that was swiped as a parameter. Default value is an empty function.

### onSwipeLeft:

A callback function that is called when a card is swiped to the left. It receives the item that was swiped as a parameter. Default value is an empty function.

### renderNoMoreCards:

A function that renders the component to be displayed when there are no more cards in the deck. Default value is undefined.

### handleEndReached:

A callback function that is called when the last card in the deck is reached. Default value is `() => {}`.

### swipeThreshold:

The distance threshold in pixels that determines when a swipe gesture is considered significant enough to trigger a swipe action. Default value is 0.25 \* SCREEN_WIDTH

### forceAnimationDuration:

The duration in milliseconds for the animation when forcefully swiping a card. Default value is `500`.

### indentSideMultiplier:

The multiplier for the horizontal indentation of cards stacked behind the top card. Default value is `8`.

### indentTopMultiplier:

The multiplier for the vertical indentation of cards stacked behind the top card. Default value is `4`.

### initialRotation:

The initial rotation angle in degrees for the top card. Default value is `0`.

### initialXPosition:

The initial X-axis position for the top card. Default value is `0`.

### initialYPosition:

The initial Y-axis position for the top card. Default value is `0`.

### rotationMultiplier:

The multiplier for the rotation range of cards as they move horizontally. Default value is `1.5`.

### rotationRange:

The maximum rotation angle in degrees for the cards as they move horizontally. Default value is `120`.

### Example

Here's an example of using SwipeDeck:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeDeck from './SwipeDeck';

const data = [
  { id: '1', text: 'Card 1' },
  { id: '2', text: 'Card 2' },
  { id: '3', text: 'Card 3' },
];

const App = () => {
  const renderCard = (item) => {
    return (
      <View style={styles.card}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  const onSwipeRight = (item) => {
    console.log('Swiped right:', item);
  };

  const onSwipeLeft = (item) => {
    console.log('Swiped left:', item);
  };

  const renderNoMoreCards = () => {
    return (
      <View style={styles.card}>
        <Text>No more cards</Text>
      </View>
    );
  };

  const handleEndReached = () => {
    console.log('End of cards reached');
  };

  return (
    <SwipeDeck
      renderCard={renderCard}
      data={data}
      onSwipeRight={onSwipeRight}
      onSwipeLeft={onSwipeLeft}
      renderNoMoreCards={renderNoMoreCards}
      handleEndReached={handleEndReached}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
});

export default App;
```

In this example, a SwipeDeck is rendered with a stack of cards from the data array. Each card is rendered using the renderCard function. The onSwipeRight and onSwipeLeft functions handle the swipe actions. The renderNoMoreCards function renders a message when there are no more cards in the deck. The handleEndReached function is called when the last card is reached.

### Advance example:

```js
import React from 'react';
import SwipeDeck from 'swipe-deck';

const Card = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Your card content here */}
    </View>
  );
};

const cardData = [
  { id: '1', ... }, // Card 1 data
  { id: '2', ... }, // Card 2 data
  // Add more card data objects as needed
];

const App = () => {
  return (
    <SwipeDeck
      renderCard={(item) => <Card item={item} />}
      data={cardData}
      swipeThreshold={100}
      forceAnimationDuration={1000}
      indentSideMultiplier={10}
      indentTopMultiplier={5}
      initialRotation={10}
      initialXPosition={0}
      initialYPosition={0}
      rotationMultiplier={2}
      rotationRange={30}
    />
  );
};
```

In this example, we provide different values to customize the appearance and behavior of the SwipeDeck component. By modifying the default values of certain props, we achieve the following effects:

swipeThreshold: We set the swipeThreshold prop to 100, modifying the distance threshold required for a swipe gesture. This allows you to adjust the sensitivity of the swipe action.

forceAnimationDuration: The forceAnimationDuration prop is set to 1000, changing the duration of the card animation when it is forcefully swiped. Adjust this value to control the speed of the animation.

indentSideMultiplier and indentTopMultiplier: These props determine the horizontal and vertical indentation of subsequent cards in the deck. We set indentSideMultiplier to 10 and indentTopMultiplier to 5 to provide a staggered effect for the cards.

initialRotation, initialXPosition, initialYPosition, rotationMultiplier, and rotationRange: These props control the initial rotation angle, position, and rotation range of the cards in the deck. By modifying these values, you can achieve various visual effects and orientations for the cards.

Feel free to adjust these prop values according to your specific design requirements

## Code example:

To see a working code example, visit the [React Native Swipeable Deck Example](https://github.com/TIKramer/react-native-swipeable-deck/tree/master/example) in the repository.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
