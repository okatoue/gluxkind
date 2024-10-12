import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useRef, } from "react"
import FetchAPI from '../../helpers/FetchAPI';

const App = () => {
  return(
    <SafeAreaView style={styles.container}>
      <FetchAPI />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;