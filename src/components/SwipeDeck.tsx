import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import
  {
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Platform,
    StyleSheet,
    View
  } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

export enum Direction
{
  Left,
  Right
}

const SwipeDeck = ({
  renderCard,
  data,
  onSwipeRight = () => { },
  onSwipeLeft = () => { },
  renderNoMoreCards = () => { },
}: {
  renderCard: any,
  data: any[],
  onSwipeRight: any,
  onSwipeLeft: any,
  renderNoMoreCards: any

}) =>
{
  const [cardIndex, setCardIndex] = useState(0);
  const latestValue = useRef(cardIndex);
  latestValue.current = cardIndex;


  const postion = useRef(new Animated.ValueXY()).current;

  useLayoutEffect(() =>
  {
    if (cardIndex != 0)
    {
      if (Platform.OS === "android")
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.spring();
    }
  }, [cardIndex]);

  useEffect(() =>
  {
    setCardIndex(0)

  }, [data])



  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_event: any, gesture: { dx: any; dy: any; }) =>
      {
        postion.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_event: any, gesture: { dx: number; }) =>
      {
        if (gesture.dx > SWIPE_THRESHOLD)
        {
          forceSwipe(Direction.Right);
        } else if (gesture.dx < -SWIPE_THRESHOLD)
        {
          forceSwipe(Direction.Left);
        } else
        {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: Direction) =>
  {
    const x = direction === Direction.Right ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(postion, {
      toValue: { x: x, y: 0 },
      duration: 500,
      useNativeDriver: false
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: Direction) =>
  {
    const item = data[latestValue.current];
    direction === Direction.Right ? onSwipeRight(item) : onSwipeLeft(item);
    postion.setValue({ x: 0, y: 0 });
    setCardIndex(latestValue.current + 1);
  };

  const resetPosition = () =>
  {
    Animated.spring(postion, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start();
  };

  const getCardStyle = () =>
  {
    const rotate = postion.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      ...postion.getLayout(),
      transform: [{ rotate: rotate }],
    };
  };

  const renderCards = () =>
  {
    if (cardIndex >= data.length)
    {
      return (
        <Animated.View style={[getCardStyle(), styles.card]}>
          {renderNoMoreCards()}
        </Animated.View>);
    } else
    {
      return data
        .map((item, index) =>
        {
          if (index === cardIndex)
          {
            return (
              <Animated.View
                key={item.id}
                style={[getCardStyle(), styles.card]}
                {...panResponder.panHandlers}
              >
                {renderCard(item)}
              </Animated.View>
            );
          } else if (index > cardIndex)
          {
            return (
              <Animated.View
                style={[
                  styles.card,
                  {
                    top: 8 * (index - cardIndex),
                    left: 2 * (index - cardIndex),
                  },
                ]}
                key={item.id}
              >
                {renderCard(item)}
              </Animated.View>
            );
          } else
          {
            return null;
          }
        })
        .reverse();
    }
  };

  return (
    <View>
      {renderCards()}
    </View>)

};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%'
  },
})


export default SwipeDeck;
