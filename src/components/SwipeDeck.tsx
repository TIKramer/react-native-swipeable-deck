import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  View,
  GestureResponderEvent,
} from 'react-native';
import {
  FORCE_ANIMATION_DURATION,
  INDENT_SIDE_MULTIPLIER,
  INDENT_TOP_MULTIPLIER,
  INITIAL_ROTATION,
  INITIAL_X_POSITION,
  INITIAL_Y_POSITION,
  ROTATION_MULTIPLIER,
  ROTATION_RANGE,
  SCREEN_WIDTH,
  SWIPE_THRESHOLD,
} from '../constants/SwipeDeck';
//TYPES
interface Item {
  id: string;
}

enum Direction {
  Left,
  Right,
}

type SDProps<T extends Item> = {
  renderCard(item: T): React.ReactNode;
  data: T[];
  onSwipeRight?(item: T): void;
  onSwipeLeft?(item: T): void;
  renderNoMoreCards?(): React.ReactNode;
  handleEndReached?(): void;
  swipeThreshold?: number;
  forceAnimationDuration?: number;
  indentSideMultiplier?: number;
  indentTopMultiplier?: number;
  initialRotation?: number;
  initialXPosition?: number;
  initialYPosition?: number;
  rotationMultiplier?: number;
  rotationRange?: number;
};
//END TYPES

export function SwipeDeck<T extends Item>({
  renderCard,
  data,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
  renderNoMoreCards = () => undefined,
  handleEndReached = () => {},
  swipeThreshold = SWIPE_THRESHOLD,
  forceAnimationDuration = FORCE_ANIMATION_DURATION,
  indentSideMultiplier = INDENT_SIDE_MULTIPLIER,
  indentTopMultiplier = INDENT_TOP_MULTIPLIER,
  initialRotation = INITIAL_ROTATION,
  initialXPosition = INITIAL_X_POSITION,
  initialYPosition = INITIAL_Y_POSITION,
  rotationMultiplier = ROTATION_MULTIPLIER,
  rotationRange = ROTATION_RANGE,
}: SDProps<T>) {
  const [cardIndex, setCardIndex] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);

  const latestValue = useRef(cardIndex);

  const position = useRef(new Animated.ValueXY()).current;

  latestValue.current = cardIndex;

  useLayoutEffect(() => {
    if (cardIndex !== 0 && cardIndex !== data.length - 1) {
      if (Platform.OS === 'android')
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.easeInEaseOut();
    }
    setDataChanged(false);
  }, [cardIndex, dataChanged]);

  useEffect(() => {
    setDataChanged(true);
    setCardIndex(0);
  }, [data]);

  useEffect(() => {
    cardIndex === data.length && handleEndReached();
  }, [data, cardIndex, handleEndReached]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (
        _event: GestureResponderEvent,
        gesture: { dx: number; dy: number }
      ) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gesture: { dx: number }
      ) => {
        if (gesture.dx > swipeThreshold) {
          forceSwipe(Direction.Right);
        } else if (gesture.dx < -swipeThreshold) {
          forceSwipe(Direction.Left);
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: Direction) => {
    const x = direction === Direction.Right ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x: x, y: initialYPosition },
      duration: forceAnimationDuration,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: Direction) => {
    const item = data[latestValue.current];
    if (item) {
      direction === Direction.Right ? onSwipeRight(item) : onSwipeLeft(item);
    }
    position.setValue({ x: initialXPosition, y: initialYPosition });
    setCardIndex(latestValue.current + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: initialXPosition, y: initialYPosition },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [
        -SCREEN_WIDTH * rotationMultiplier,
        initialRotation,
        SCREEN_WIDTH * rotationMultiplier,
      ],
      outputRange: [
        `-${rotationRange}deg`,
        `${initialRotation}deg`,
        `${rotationRange}deg`,
      ],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate: rotate }],
    };
  };

  const renderCards = () => {
    if (cardIndex >= data.length) {
      return (
        <Animated.View style={[getCardStyle(), styles.card]}>
          {renderNoMoreCards()}
        </Animated.View>
      );
    } else {
      return data
        .map((item, index) => {
          if (index === cardIndex) {
            return (
              <Animated.View
                key={item.id}
                style={[getCardStyle(), styles.card]}
                {...panResponder.panHandlers}
              >
                {renderCard(item)}
              </Animated.View>
            );
          } else if (index > cardIndex) {
            return (
              <Animated.View
                style={[
                  styles.card,
                  {
                    top: indentTopMultiplier * (index - cardIndex),
                    left: indentSideMultiplier * (index - cardIndex),
                  },
                ]}
                key={item.id}
              >
                {renderCard(item)}
              </Animated.View>
            );
          } else {
            return null;
          }
        })
        .reverse();
    }
  };

  return <View>{renderCards()}</View>;
}

const styles = StyleSheet.create({
  card: {
    opacity: 1,
    position: 'absolute',
    width: '100%',
  },
});

export default SwipeDeck;
