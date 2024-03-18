import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

const ObjectAnimation = () => {
  const object1X = useSharedValue(-200);
  const object1Y = useSharedValue(-200);
  const object2X = useSharedValue(-200);
  const object2Y = useSharedValue(-200);

  // Animate object 1
  const animateObject1 = () => {
    object1X.value = withTiming(500);
    object1Y.value = withTiming(200, {}, () => {
      // After object 1 finishes its animation, start animating object 2
      runOnJS(animateObject2)();
    });
  };

  // Animate object 2
  const animateObject2 = () => {
    object2X.value = withTiming(475);
    object2Y.value = withTiming(180);
  };

  // Animated styles for object 1
  const object1Styles = useAnimatedStyle(() => ({
    transform: [{ translateX: object1X.value }, { translateY: object1Y.value }],
  }));

  // Animated styles for object 2
  const object2Styles = useAnimatedStyle(() => ({
    transform: [{ translateX: object2X.value }, { translateY: object2Y.value }],
  }));

  // Start the animation when the component mounts
  React.useEffect(() => {
    animateObject1();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.object, object1Styles]} />
      <Animated.View style={[styles.object, object2Styles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  object: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    position: 'absolute',
  },
});

export default ObjectAnimation;