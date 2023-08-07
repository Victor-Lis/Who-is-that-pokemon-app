import { NavigationContainer } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()

import Header from '../Layout/Header';
import Home from '../Components/Home';
import User from '../Components/User';
import { useEffect } from 'react';

export default function Routes({userID, setUserID}) {

  return (

    <NavigationContainer>

      <Stack.Navigator

        screenOptions={{
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);

            return (
              <Header
                title={title}
              />
            );
          }
        }}

      >

        <Stack.Screen

          name='Home'
          component={Home}
          initialParams={{userID: userID}}
          options={{

            animation: "fade",
            animationDuration: 10,

          }}

        />

        <Stack.Screen

          name='User'
          component={User}
          initialParams={{userID: userID, setUserID: setUserID}}
          options={{

            animation: "fade",
            animationDuration: 10,

          }}

        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}