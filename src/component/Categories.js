import React from 'react'
import { ScrollView, View, FlatList, Text } from 'react-native'
import Category from './Category'

const Categories = ({ categories, content, onCategoryTouch ,lastCursor}) => {
  return (
    <View style={{ flex: 1, }}>
      <ScrollView vertical>
        {
          categories.map(c => {
            return <Category
              c={c}
              key={c.id}
              onCategoryTouch={onCategoryTouch}
            />
          })
        }
    <Text>{lastCursor}</Text>
      </ScrollView>
      <FlatList
        data={content}
        renderItem={({ item }) => <Text>{item.userPhoto}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Categories
