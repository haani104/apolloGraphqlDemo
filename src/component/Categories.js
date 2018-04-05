import React from 'react'
import { ScrollView, View, FlatList, Text } from 'react-native'
import Category from './Category'

const Categories = ({ categories, onCategoryTouch }) => {
  console.log("in Categories",categories);
  return (
    <View style={{ flex: 1, }}>
      <ScrollView horizontal>
        {
          categories.map(c => {
            return (
            <Category
              c={c}
              key={c.id}
              onCategoryTouch={onCategoryTouch}
            />
              
              )
          })
        }
      </ScrollView>
      
    </View>
  )
}

export default Categories
