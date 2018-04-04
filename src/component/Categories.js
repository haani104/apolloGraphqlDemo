import React from 'react'
import { ScrollView, View, FlatList, Text } from 'react-native'
import Category from './Category'

const Categories = ({ categories, content, onCategoryTouch }) => {
  return (
    <View style={{ flex: 1, }}>
      <ScrollView horizontal>
        {
          categories.map(c => {
            return <Category
              c={c}
              key={c.id}
              onCategoryTouch={onCategoryTouch}
            />
          })
        }
      </ScrollView>
      <FlatList
        data={content}
        renderItem={({ item }) => <Text>{item.id}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Categories
