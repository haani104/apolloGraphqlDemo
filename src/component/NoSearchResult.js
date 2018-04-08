import React from 'react'
import { View, Text, Image } from 'react-native'

const NoSearchResult = () => (
  <View style={{alignItems: 'center', top: '40%', paddingHorizontal: 40}}>
    <Image source={require('./assets/search.png')} />
    <View style={{paddingTop: 32}}>
      <Text style={{textAlign: 'center', fontSize: 16,}}>Maaf, halaman yang kamu cari tidak dapat ditemukan</Text>
    </View>
  </View>
)

export default NoSearchResult
