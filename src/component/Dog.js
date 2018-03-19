import React from 'react'
import { View, Text, Image } from 'react-native'

const Dog = ({ url, breed }) => (
    <View>
        <Text>{breed}</Text>
        <Image source={{ uri: url }} style={{width: 50, height: 50}} />
    </View>
)

export default Dog
