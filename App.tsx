import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import Store from './redux/stores/configureStore';
import React from 'react';
import MusicPlayer from './screens/MusicPlayer';


export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={Store}>
        <SafeAreaProvider>
          <StatusBar style={"light"} />
          <Navigation />
          <MusicPlayer />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
