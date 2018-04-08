import React from 'react'
import { FlatList, Text, View, Image, Dimensions } from 'react-native'
import { Chip } from 'unify-react-native'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { filter } from 'lodash'

import TKPLoader from './TKPLoader'
import NoSearch from './NoSearchResult'

const { width } = Dimensions.get('window')
const IMAGE_DIM = (width - 6) / 3

const CONTENT_QUERY = gql` query getContent($limit: Int!, $cursor: String, $idcategory: Int!, $search: String) {
    get_discovery_kol_data(limit: $limit, cursor: $cursor, idcategory: $idcategory, search: $search) {
      error
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

class ContentList extends React.Component {
  constructor(props) {
    super(props)
  }

  _keyExtractor = (item, index) => index

  _renderItem = ({ item }) => (
    <View style={{ padding: 1, }}>
      <Image
        source={{ uri: item.content[0].imageurl }}
        style={{ width: IMAGE_DIM, height: IMAGE_DIM }}
      />
    </View>
  )

  _loadMore = (fetchMore) => {

  }

  render() {
    return (
      <Query
        query={CONTENT_QUERY}
        variables={{
          limit: 15,
          cursor: "",
          idcategory: this.props.catId,
          search: this.props.searchText
        }}
      >
        {({ data: { get_discovery_kol_data }, loading, error, fetchMore }) => {
          if (loading) return <TKPLoader />
          if (error) return <Text>Error :(</Text>

            if (!get_discovery_kol_data || get_discovery_kol_data.postKol.length === 0) {
              return (
                <NoSearch />
              )
            }

          const postKolData = filter(get_discovery_kol_data.postKol, (p) => {
            return (p.content[0].imageurl !== '')
          })

          return (
            <FlatList
              data={postKolData}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onEndReachedThreshold={0.5}
              numColumns={3}
              ListFooterComponent={() => <View style={{ height: 10 }}></View>}
              contentContainerStyle={{
                paddingBottom: 246,
                paddingTop: 10,
              }}
              onEndReached={() => {
                fetchMore({
                  query: CONTENT_QUERY,
                  variables: {
                    cursor: get_discovery_kol_data.lastCursor,
                    limit: 15,
                    idcategory: this.props.catId,
                    search: this.props.searchText,
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

                    }
                    return result;
                  }
                })
              }
              }
            />
          )
        }}
      </Query>
    )
  }
}

export default ContentList