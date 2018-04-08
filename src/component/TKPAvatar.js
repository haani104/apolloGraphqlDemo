import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const TKPAvatar = ({imgSource}) => {
  return (
    <View>
      <Image source={{uri: imgSource}} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 49,
    height: 49,
    borderRadius: 25,
  }
})

export default TKPAvatar