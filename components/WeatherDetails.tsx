import { StyleSheet, View, Text } from 'react-native';
import { AnimatedWeatherIcon } from './AnimatedWeatherIcon';
import { COLORS } from '../constants/Colors';

interface WeatherDetailsProps {
  weatherData: any;
}

export function WeatherDetails({ weatherData }: WeatherDetailsProps) {
  return (
    <View style={styles.container}>
      {/* Main Weather Display */}
      <View style={styles.mainWeather}>
        <Text style={styles.temperature}>{Math.round(weatherData.main.temp)}°C</Text>
        <View style={styles.weatherIconContainer}>
          <AnimatedWeatherIcon 
            condition={weatherData.weather[0].main}
            size={80}
            color={COLORS.primary}
          />
          <Text style={styles.weatherMain}>{weatherData.weather[0].description}</Text>
        </View>
      </View>

      {/* Weather Parameters Grid */}
      <View style={styles.grid}>
        {/* Feels Like */}
        <View style={styles.gridItem}>
          <AnimatedWeatherIcon 
            condition="Thermometer"
            size={32}
            color={COLORS.accent}
          />
          <Text style={styles.label}>Feels Like</Text>
          <Text style={styles.value}>{Math.round(weatherData.main.feels_like)}°C</Text>
        </View>

        {/* Humidity */}
        <View style={styles.gridItem}>
          <AnimatedWeatherIcon 
            condition="Water"
            size={32}
            color={COLORS.accent}
          />
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.value}>{weatherData.main.humidity}%</Text>
        </View>

        {/* Wind */}
        <View style={styles.gridItem}>
          <AnimatedWeatherIcon 
            condition="Wind"
            size={32}
            color={COLORS.accent}
          />
          <Text style={styles.label}>Wind Speed</Text>
          <Text style={styles.value}>{weatherData.wind.speed} m/s</Text>
        </View>

        {/* Pressure */}
        <View style={styles.gridItem}>
          <AnimatedWeatherIcon 
            condition="Pressure"
            size={32}
            color={COLORS.accent}
          />
          <Text style={styles.label}>Pressure</Text>
          <Text style={styles.value}>{weatherData.main.pressure} hPa</Text>
        </View>

        {/* Visibility */}
        <View style={styles.gridItem}>
          <AnimatedWeatherIcon 
            condition="Eye"
            size={32}
            color={COLORS.accent}
          />
          <Text style={styles.label}>Visibility</Text>
          <Text style={styles.value}>{weatherData.visibility / 1000} km</Text>
        </View>

        {/* Cloud Cover */}
        <View style={styles.gridItem}>
          <AnimatedWeatherIcon 
            condition="CloudCover"
            size={32}
            color={COLORS.accent}
          />
          <Text style={styles.label}>Cloud Cover</Text>
          <Text style={styles.value}>{weatherData.clouds.all}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  mainWeather: {
    alignItems: 'center',
    marginBottom: 24,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  weatherIconContainer: {
    alignItems: 'center',
  },
  weatherMain: {
    fontSize: 24,
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
}); 