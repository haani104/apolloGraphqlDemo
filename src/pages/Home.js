import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Categories from '../component/Categories'

const CATEGORY_QUERY = gql` query getContent($limit: Int!, $cursor: String, $idcategory: Int!) {
  get_discovery_kol_data(limit: $limit, cursor: $cursor, idcategory: $idcategory) {
    error
    categories {
      id
      name
    }
    postKol {
      isLiked
      isFollow
      id
      commentCount
      likeCount
      createTime
      description
      content {
        imageurl
        tags {
          id
          type
          url
          link
          price
          caption
        }
      }
      userName
      userInfo
      userIsFollow
      userPhoto
      userUrl
      userId
    }
    lastCursor
  }
}`

const handleOnCategoryTouch = (id) => {
  //Again call the query
}

const Home = () => (
  <Query
    query={CATEGORY_QUERY}
    variables={{ limit: 20, cursor: "", idcategory: 0 }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error :(</Text>;
      return (
        <Categories
          categories={data.get_discovery_kol_data.categories}
          content={data.get_discovery_kol_data.postKol}
          onCategoryTouch={handleOnCategoryTouch}
        />
      )
    }}
  </Query>
)

export default Home