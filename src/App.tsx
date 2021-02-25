import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import Home from './pages/home';

const App: React.FC = () => (
  <SafeAreaView>
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/" component={Home} />
      </View>
    </NativeRouter>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
});

export default App;
