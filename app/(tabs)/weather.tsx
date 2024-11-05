import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import axios from 'axios';
import { Keyboard } from 'react-native';
import { AnimatedWeatherIcon } from '@/components/AnimatedWeatherIcon';
import { WeatherDetails } from '@/components/WeatherDetails';
import { COLORS } from '@/constants/Colors';

const Weather = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const textInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCountAdd = () => {
    setCount(count + 1);
  }
  const handleCountSub = () => {
    setCount(count - 1);
  }

  const handleTypeText = (newText: string) => {
    setText(newText)
    // console.log(newText);
  }

  const handleSearch = async (searchText: string) => {
    Keyboard.dismiss();
    if (!searchText.trim()) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`City not found or API error (${response.status})`);
      }
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = () => {
    handleSearch(text);
  }

  const handleFocus = () => {
    setText('Pune');
    handleSearch('Pune');
  }

  const handleClear = () => {
    setWeatherData(null)
    setText('')
  }

  const time = new Date().toLocaleTimeString();

  const apiKey = 'd0ca82dad8ecd0c6e8acca9054ebe485';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${apiKey}`;

  useEffect(() => {
    console.log(count, time);
  }, [count])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Weather App</Text>
          <Text style={styles.headerSubtitle}>Check weather worldwide</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput 
              placeholder="Enter city name" 
              placeholderTextColor={COLORS.textLight}
              style={styles.input} 
              onChangeText={handleTypeText} 
              value={text}
              ref={textInputRef}
            />
            <TouchableOpacity 
              style={[styles.iconButton, styles.searchButton]}
              onPress={handleSubmit}
            >
              <TabBarIcon name="search-outline" color={COLORS.white} size={20} />
            </TouchableOpacity>
          </View>
         
        </View>

        {weatherData === null && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Search for a city</Text>
            <TouchableOpacity 
              style={styles.suggestionButton} 
              onPress={handleFocus}
            >
              <Text style={styles.suggestionButtonText}>Try searching "Pune"</Text>
            </TouchableOpacity>
          </View>
        )}

        {weatherData && (
          <ScrollView style={styles.weatherContainer}>
            <WeatherDetails weatherData={weatherData} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Weather

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
  },
  clearButton: {
    backgroundColor: 'transparent',
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowColor: 'transparent',
    elevation: 0,
    marginLeft: 8,
  },
  clearButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearButtonText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyStateText: {
    fontSize: 18,
    color: COLORS.textLight,
    marginTop: 12,
  },
  suggestionButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  suggestionButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  weatherContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    padding: 20,
  },
  weatherHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  weatherTitleContainer: {
    flex: 1,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 24,
  },
  tempContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  weatherMain: {
    fontSize: 24,
    color: COLORS.text,
    marginTop: 8,
  },
  weatherDescription: {
    fontSize: 16,
    color: COLORS.textLight,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  weatherDetail: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  sunContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  weatherIconContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  weatherAnimation: {
    width: 100,
    height: 100,
  },
  emptyStateAnimation: {
    width: 150,
    height: 150,
  },
});