import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Store from './Store';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <Provider store={Store}>
      <SafeAreaView style={styles.container}>
      <StackNavigator/>
      <StatusBar style="auto" />
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',     
  },
});
