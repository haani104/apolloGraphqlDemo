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

const CATEGORY_QUERY = gql` query getContent($limit: Int!, $cursor: String, $idcategory: Int!, $search: String) {
  get_discovery_kol_data(limit: $limit, cursor: $cursor, idcategory: $idcategory, search: $search) {
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

const Home = ({ catId = 0, changeCatId, searchText }) => (
  <Query
    query={CATEGORY_QUERY}
    variables={{
      limit: 15,
      cursor: "",
      idcategory: catId,
      search: searchText,
    }}
  >
    {({ data: { get_discovery_kol_data }, loading, error, fetchMore }) => {
      if (loading) return <Text>Loading...</Text>
      if (error) return <Text>Error :(</Text>
      console.log('Error', error)
      console.log('DATA', get_discovery_kol_data)
      return (
        <Categories
          onCatChange={changeCatId}
          onLoadMore={
            () => {
              fetchMore({
                query: CATEGORY_QUERY,
                variables: {
                  cursor: get_discovery_kol_data.lastCursor,
                  limit: 15,
                  idcategory: catId,
                  search: searchText,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const prevPostKolData = previousResult.get_discovery_kol_data.postKol
                  const newPostKolData = fetchMoreResult.get_discovery_kol_data.postKol
                  const newCursor = fetchMoreResult.get_discovery_kol_data.lastCursor

                  if (!newCursor) {
                    return {
                      get_discovery_kol_data: {
                        ...previousResult.get_discovery_kol_data,
                        postKol: [...prevPostKolData],
                      }

                    }
                  }
                  console.log('NEW', fetchMoreResult)
                  console.log('PREV', previousResult)

                  const result = {
                    get_discovery_kol_data: {
                      ...previousResult.get_discovery_kol_data,
                      postKol: [...prevPostKolData, ...newPostKolData],
                      lastCursor: newCursor,
                    }

                  };

                  console.log('RETURNED', result)
                  return result;
                }
              })
            }
          }
          categories={get_discovery_kol_data.categories || []}
          content={get_discovery_kol_data.postKol}
          onCategoryTouch={handleOnCategoryTouch}
        />
      )
    }}
  </Query>
)

export default Home