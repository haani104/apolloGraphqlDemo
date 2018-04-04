import React from 'react'
import { Chip } from 'unify-react-native'
import { View, Text, TouchableOpacity } from 'react-native'

const Category = ({ c, onCategoryTouch, onLoadMore }) => {
  return (
    <TouchableOpacity onPress={() => onCategoryTouch(c.id)}>
      <View style={{ borderWidth: 1, padding: 10, borderColor: 'green' }}>
        <Text>{c.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Category
