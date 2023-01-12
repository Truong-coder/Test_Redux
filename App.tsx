import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import EditScreen from './src/screens/EditScreen';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
// import  persistor from './src/redux/store';

const Stack = createNativeStackNavigator();
let persistor = persistStore(store);

export default function App() {
  const RootApp = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerTitleAlign: 'center'}}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{headerTitleAlign: 'center'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootApp />
      </PersistGate>
    </Provider>
  );
}
