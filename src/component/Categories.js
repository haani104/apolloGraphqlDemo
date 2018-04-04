import React from 'react'
import { ScrollView, View, FlatList, Text, Image } from 'react-native'
import Category from './Category'

const Categories = ({ categories, content, onLoadMore, onCatChange }) => {
  return (
    <View style={{ flex: 1, }}>
      <ScrollView horizontal>
        {
          categories.map(c => {
            return <Category
              c={c}
              key={c.id}
              onCategoryTouch={onCatChange}
              onLoadMore={onLoadMore}
            />
          })
        }
      </ScrollView>
      <FlatList
        data={content}
        renderItem={({ item }) => <Image
          source={{ uri: item.content[0].imageurl }}
          style={{ width: 100, height: 100 }}
        />}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMore}
        numColumns={3}
      />
    </View>
  )
}

export default Categories
