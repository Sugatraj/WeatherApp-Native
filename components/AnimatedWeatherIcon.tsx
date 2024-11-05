import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  useSharedValue,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useEffect } from 'react';
import { COLORS } from '../constants/Colors';

interface Props {
  condition: string;
  size?: number;
  color?: string;
}

export function AnimatedWeatherIcon({ condition, size = 64, color = COLORS.primary }: Props) {
  // Add shared values for animations
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Start animations based on condition
    switch (condition) {
      case 'Clear':
        rotation.value = withRepeat(
          withTiming(360, {
            duration: 4000,
            easing: Easing.linear,
          }),
          -1
        );
        break;

      case 'Clouds':
        translateX.value = withRepeat(
          withSequence(
            withTiming(-10, { duration: 1000 }),
            withTiming(10, { duration: 1000 })
          ),
          -1,
          true
        );
        translateY.value = withRepeat(
          withSequence(
            withTiming(-5, { duration: 1000 }),
            withTiming(5, { duration: 1000 })
          ),
          -1,
          true
        );
        break;

      case 'Rain':
      case 'Drizzle':
        translateY.value = withRepeat(
          withSequence(
            withSpring(-8),
            withSpring(0)
          ),
          -1,
          true
        );
        break;

      case 'Thunderstorm':
        scale.value = withRepeat(
          withSequence(
            withTiming(1.2, { duration: 200 }),
            withTiming(1, { duration: 200 }),
            withDelay(1000, withTiming(1, { duration: 100 }))
          ),
          -1,
          true
        );
        break;

      case 'Wind':
        rotation.value = withRepeat(
          withTiming(360, {
            duration: 3000,
            easing: Easing.linear,
          }),
          -1
        );
        break;
      
      case 'Water':
        scale.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: 1000 }),
            withTiming(1, { duration: 1000 })
          ),
          -1,
          true
        );
        break;
      
      case 'Pressure':
        rotation.value = withRepeat(
          withSequence(
            withTiming(-30, { duration: 500 }),
            withTiming(30, { duration: 500 })
          ),
          -1,
          true
        );
        break;
    }
  }, [condition]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <TabBarIcon 
          name={getWeatherIcon(condition)} 
          color={color} 
          size={size} 
        />
      </Animated.View>
    </View>
  );
}

const getWeatherIcon = (condition: string) => {
  const icons = {
    Clear: 'sunny',
    Clouds: 'cloud',
    Rain: 'rainy',
    Drizzle: 'water',
    Thunderstorm: 'thunderstorm',
    Snow: 'snow',
    Mist: 'water',
    Smoke: 'cloud',
    Haze: 'cloud',
    Dust: 'cloud',
    Fog: 'cloud',
    Sand: 'cloud',
    Ash: 'cloud',
    Squall: 'thunderstorm',
    Tornado: 'thunderstorm',
    Thermometer: 'thermometer-outline',
    Water: 'water-outline',
    Wind: 'navigate-outline',
    Pressure: 'speedometer-outline',
    Eye: 'eye-outline',
    CloudCover: 'cloud-circle-outline',
  };
  return icons[condition as keyof typeof icons] || 'cloud-outline';
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
  },
  iconContainer: {
    padding: 8,
  },
});
