import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/views/HomeScreen'
import ScanScreen from './src/views/ScanScreenFlash'
import DetailsScreen from './src/views/DetailsScreen'
import FullImage from './src/views/FullImage'

// Déclaration d'une pile de vues dans laquelle je souhaite naviguer sans que ce soit visible dans ma tab bar
function HomeStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Accueil" component={HomeScreen} />
          <Stack.Screen name="productInfo" component={DetailsScreen} />
          <Stack.Screen name="FullImage" component={FullImage} />
        </Stack.Navigator>
    );
  }

// Navigation principale sous forme de tab bar
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppNavigator() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Accueil" component={HomeStack} />
          <Tab.Screen name="Scanner" component={ScanScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }



export default class AppContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async _loadAssetsAsync() {

        await Font.loadAsync({
            'linotype_brewery_bold': require('./assets/fonts/linotype_brewery_bold.ttf'),
            'SFProDisplay-Bold': require('./assets/fonts/SF-Pro-Display-Black.otf'),
            'SFProDisplay-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf')
        })
    }


        render() {
            if (!this.state.isReady) {
              return (
                <AppLoading
                  startAsync={this._loadAssetsAsync}
                  onFinish={() => this.setState({ isReady: true })}
                  onError={console.warn}
                />
              );
            }

            return (
                <AppNavigator />
            );
          }


}
