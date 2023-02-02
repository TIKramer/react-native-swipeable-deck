
export interface Item {
  id:string;
}

export enum Direction
{
  Left,
  Right
}

 type SDProps<T extends Item> = {
  renderCard(item: T): React.ReactNode,
  data: T[],
  onSwipeRight?(item: T): void,
  onSwipeLeft?(item: T): void,
  renderNoMoreCards?(): React.ReactNode
  handleEndReached?(): void
};