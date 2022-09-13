import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import SwipeDeck from './src/components/Deck';

const DATA = [
  {
    id: 1,
    name: "Thomas Kramer",
    occupation: 'React Native Developer',
    uri: "https://avatars.githubusercontent.com/u/6935835?v=4",
    description: 'I enjoy coding, coffee, and watching movies.'
  },
  {
    id: 2,
    name: "Peter Bearson",
    occupation: 'Fisherman',
    uri: "https://picsum.photos/id/433/600",
    description: 'I enjoy fish, and sleeping in on cold winter nights.'
  },
  {
    id: 3,
    name: "Doug Dogson",
    occupation: 'Stay at home son',
    uri: "https://picsum.photos/id/1025/600",
    description: 'I enjoy treats and belly scratches'

  },
];

type SwipeData = {
  id: number;
  name: string;
  occupation: string;
  uri: string;
  description: string;

};

export default function App()
{
  const [swipeData, setSwipeData] = useState<string[]>([])

  const renderCard = (item: SwipeData) =>
  {
    return (
      <Card mode='elevated' elevation={4} style={{ marginHorizontal: 20 }}>
        <Card.Title title={item.name} subtitle={item.occupation} />
        <Card.Content>
        </Card.Content>
        <Card.Cover style={{ height: 300, marginHorizontal: 20 }} source={{ uri: item.uri }} />
        <Card.Content>
          <Paragraph>{item.description}</Paragraph>

        </Card.Content>
      </Card>
    );
  };

  const onSwipeLeft = (item: SwipeData) =>
  {
    setSwipeData(oldArray => [...oldArray, `You swiped left on ${item.name}`]);
  };
  const onSwipeRight = (item: SwipeData) =>
  {

    setSwipeData(oldArray => [...oldArray, `You swiped right on ${item.name}`]);
  };

  const renderItem = ({ item }: { item: string }) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

  const renderNoMoreCards = () =>
  {
    return (
      <Card mode='elevated' elevation={4} style={{ marginHorizontal: 20 }}>
        <Card.Title title={"Out of cards"} />
        <Card.Content style={{ height: 300 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Paragraph> You have swiped every one in your area</Paragraph>
          </View>
        </Card.Content>

        <Card.Content>
        </Card.Content>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Title>Swipe Demo</Title>
          <Text> Try swiping right to like and left to dislike</Text>
        </View>
      </View>
      <View style={styles.deckContainer}>
        <SwipeDeck
          data={DATA}
          renderNoMoreCards={renderNoMoreCards}
          renderCard={renderCard}
          onSwipeLeft={(item: SwipeData) => onSwipeLeft(item)}
          onSwipeRight={(item: SwipeData) => onSwipeRight(item)}
        />
      </View>
      <View style={styles.footer}>
        <FlatList
          data={swipeData}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#F5FCFF",
  },
  titleContainer: { flex: 0.2 },
  deckContainer: {
    flex: 1,
    alignItems: 'flex-start',

  },
  contentContainer: {
    flex: 0.3,
  },
  footer: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
  },
});
