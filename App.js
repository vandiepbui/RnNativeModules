import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Button,
  NativeEventEmitter,
} from 'react-native';
import React, {useEffect} from 'react';

const {CalendarModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(CalendarModule);

const App = () => {
  useEffect(() => {
    eventEmitter.addListener('EventCount', eventCount => {
      console.log(eventCount);
    });
    return () => {
      eventEmitter.removeAllListeners();
    };
  }, []);

  const onPressButton = async () => {
    const result = await CalendarModule.createCalendarPromise();
    console.log(result);
  };
  return (
    <View style={styles.container}>
      <Button title="Press me" color="#841584" onPress={onPressButton} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
