import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Appbar, Provider, Surface, Card, TextInput, Button, IconButton } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import Widgets from './components/Widgets';

const Stack = createNativeStackNavigator();

// Main App component
const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
          <Stack.Screen name="MoroccanIndustries" component={MoroccanIndustriesPage} />
          <Stack.Screen name="SmartCounter" component={SmartCounterPage} />
          <Stack.Screen name="Calculator" component={CalculatorPage} />
          <Stack.Screen name="Weather" component={WeatherPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

// MainPage with Navigation to Different Features
const MainPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Appbar.Header>
        <Appbar.Content title="MINI-APP" />
      </Appbar.Header>

      <Card>
        <Card.Content title="Moroccan Industries Article" right={(props) => <IconButton {...props} icon="arrow-right" />} />
        <Card.Content>
          <Button mode="contained" onPress={() => navigation.navigate('MoroccanIndustries')}>Dive on Widgets</Button>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content title="Smart Counter" right={(props) => <IconButton {...props} icon="arrow-right" />} />
        <Card.Content>
          <Button mode="contained" onPress={() => navigation.navigate('SmartCounter')}>Counter smart</Button>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content title="Calculator" right={(props) => <IconButton {...props} icon="arrow-right" />} />
        <Card.Content>
          <Button mode="contained" onPress={() => navigation.navigate('Calculator')}>Calculator</Button>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content title="Weather Page" right={(props) => <IconButton {...props} icon="arrow-right" />} />
        <Card.Content>
          <Button mode="contained" onPress={() => navigation.navigate('Weather')}>Weather app</Button>
        </Card.Content>
      </Card>
    </View>
  );
};

// Moroccan Industries Page
const MoroccanIndustriesPage = () => (
  <View style={{ flex: 1, padding: 16 }}>
    <Widgets />
  </View>
);

// Smart Counter Page
const SmartCounterPage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24 }}>Counter: {counter}</Text>
      <Button mode="contained" onPress={() => setCounter(counter + 1)}>Increment Counter</Button>
      <IconButton icon="refresh" onPress={() => console.log('Reload button clicked!')} />
    </View>
  );
};

// Calculator Page
const CalculatorPage = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const calculateResult = (operation) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let res;

    switch (operation) {
      case '+':
        res = n1 + n2;
        break;
      case '-':
        res = n1 - n2;
        break;
      case '*':
        res = n1 * n2;
        break;
      case '/':
        res = n2 !== 0 ? n1 / n2 : 'Error';
        break;
      default:
        res = null;
    }

    setResult(res);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        label="Enter first number"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Enter second number"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
        style={{ marginBottom: 20 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button mode="contained" onPress={() => calculateResult('+')}>+</Button>
        <Button mode="contained" onPress={() => calculateResult('-')}>-</Button>
        <Button mode="contained" onPress={() => calculateResult('*')}>*</Button>
        <Button mode="contained" onPress={() => calculateResult('/')}>/</Button>
      </View>
      {result !== null && <Text style={{ marginTop: 20 }}>Result: {result}</Text>}
    </View>
  );
};

// Weather Page
const WeatherPage = () => {
  const [city, setCity] = useState('Paris');
  const [weatherData, setWeatherData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f16981853df72b2a4bbffc4d7f5e5b56&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [city]);

  const countryCode = weatherData?.sys?.country === 'EH' ? 'MA' : weatherData?.sys?.country;
  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Appbar.Header>
        <Appbar.Content title="Weather App" />
      </Appbar.Header>
      <TextInput
        label="Enter City"
        value={city}
        onChangeText={setCity}
        style={{ marginBottom: 20 }}
      />
      
      <Button mode="contained" onPress={getWeatherData}>Get Weather</Button>

      {weatherData ? (
        <Surface style={{ padding: 16, marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>City: {weatherData.name}</Text>
          <Text>Temperature: {weatherData.main.temp}°C</Text>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Text>Pressure: {weatherData.main.pressure} hPa</Text>
          <Image
            source={{ uri: `https://flagsapi.com/${countryCode}/flat/64.png` }}
            style={{ width: 64, height: 48, marginTop: 10 }}
          />
          <Button mode="contained" onPress={toggleShowMore}>
            {showMore ? "Show Less" : "Show More"}
          </Button>

          {showMore && (
            <View style={{ marginTop: 16 }}>
              <Text>Feels Like: {weatherData.main.feels_like}°C</Text>
              <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
              <Text>Cloudiness: {weatherData.clouds.all}%</Text>
              <Text>Visibility: {weatherData.visibility / 1000} km</Text>
            </View>
          )}
        </Surface>
      ) : (
        <Text style={{ marginTop: 20 }}>Loading weather data...</Text>
      )}
    </View>
  );
};

export default App;
