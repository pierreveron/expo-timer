import { Inter_600SemiBold, Inter_900Black } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Load any resources or data that we need prior to rendering the app
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded, error] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setLoadingComplete(true)
      SplashScreen.hideAsync();
    } else if (error)
      console.warn(error);
  }, [fontsLoaded, error]);

  return isLoadingComplete;
}
