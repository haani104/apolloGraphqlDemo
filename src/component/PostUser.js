import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import TKPAvatar from './TKPAvatar'
import { UserText } from './TKPText'

const PostUser = ({ name, type, image }) => {
  return (
    <View style={styles.container}>
      <TKPAvatar imgSource={image}/>
      <View style={styles.userDetailWrapper}>
        <View style={styles.nameWrapper}>
          <View>
            <Image source={require('./assets/icons.png')} />
          </View>
          <View style={{paddingLeft: 5}}>
            <UserText style={{fontSize: 14}}>{name}</UserText>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 11}}>{type}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(224, 224, 224)'
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userDetailWrapper: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  }
})

export default PostUser