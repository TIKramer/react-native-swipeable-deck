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
};
//END TYPES

export function SwipeDeck<T extends Item>({
  renderCard,
  data,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
  renderNoMoreCards = () => undefined,
  handleEndReached = () => {},
}: SDProps<T>) {
  const [cardIndex, setCardIndex] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);

  const latestValue = useRef(cardIndex);

  const postion = useRef(new Animated.ValueXY()).current;

  latestValue.current = cardIndex;

  useLayoutEffect(() => {
    if (cardIndex != 0 && cardIndex != data.length - 1) {
      if (Platform.OS === 'android')
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.easeInEaseOut;
    }
    setDataChanged(false);
  }, [cardIndex, dataChanged]);

  useEffect(() => {
    setDataChanged(true);

    setCardIndex(0);
  }, [data]);

  useEffect(() => {
    cardIndex === data.length ? handleEndReached() : null;
  }, [data, cardIndex, handleEndReached]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (
        _event: GestureResponderEvent,
        gesture: { dx: number; dy: number }
      ) => {
        postion.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gesture: { dx: number }
      ) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe(Direction.Right);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe(Direction.Left);
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: Direction) => {
    const x = direction === Direction.Right ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(postion, {
      toValue: { x: x, y: INITIAL_Y_POSITION },
      duration: FORCE_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: Direction) => {
    const item = data[latestValue.current];
    if (item) {
      direction === Direction.Right ? onSwipeRight(item) : onSwipeLeft(item);
    }
    postion.setValue({ x: INITIAL_X_POSITION, y: INITIAL_Y_POSITION });
    setCardIndex(latestValue.current + 1);
  };

  const resetPosition = () => {
    Animated.spring(postion, {
      toValue: { x: INITIAL_X_POSITION, y: INITIAL_Y_POSITION },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = postion.x.interpolate({
      inputRange: [
        -SCREEN_WIDTH * ROTATION_MULTIPLIER,
        INITIAL_ROTATION,
        SCREEN_WIDTH * ROTATION_MULTIPLIER,
      ],
      outputRange: [
        `-${ROTATION_RANGE}deg`,
        `${INITIAL_ROTATION}deg`,
        `${ROTATION_RANGE}deg`,
      ],
    });
    return {
      ...postion.getLayout(),
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
                    top: INDENT_TOP_MULTIPLIER * (index - cardIndex),
                    left: INDENT_SIDE_MULTIPLIER * (index - cardIndex),
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
