import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-swipe-deck' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type SwipeDeckProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'SwipeDeckView';

export const SwipeDeckView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<SwipeDeckProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
