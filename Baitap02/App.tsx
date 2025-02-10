import { StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';

const App = () => {

  const [isShowSplash, setIsShowSplash] = useState(true);

  const [accessToken, setAccessToken] = useState('');

  const {getItem, setItem} = useAsyncStorage('assetToken');

  const checkLogin = async () => {
    const token = await getItem();
    console.log(token);
    token && setAccessToken(token);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    checkLogin();
  }, [])

  return (
    <>
      <StatusBar barStyle={'dark-content'} translucent backgroundColor={'transparent'}/>
      {
        isShowSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            { accessToken ? <MainNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        )
      }
    </>
  )
}

export default App