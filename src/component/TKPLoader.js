import React from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  View
} from 'react-native'

const TKPLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default TKPLoader
