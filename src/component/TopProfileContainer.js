import React from 'react'
import { ScrollView, Text, View, FlatList } from 'react-native'
import { Chip } from 'unify-react-native'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import TKPLoader from './TKPLoader'
import NoSearch from './NoSearchResult'
import PostUser from './PostUser'

const TOP_PROFILE_QUERY = gql`query getContent($limit: Int!, $cursor: String, $search: String) {
get_whitelist_user(limit: $limit, cursor: $cursor, search: $search) {
    error
    data {
      isFollowed
      info
      userId
      userName
      userPhoto
      userApplink
      isKol
    }
    lastCursor
  }
}
`

class TopProfileContainer extends React.Component {
  _renderItem = ({ item }) => (
      <PostUser name={item.userName} type={item.info} image={item.userPhoto} />
  )

  _keyExtractor = (item, index) => index

  render() {
    return (
      <Query
        query={TOP_PROFILE_QUERY}
        variables={{
          limit: 20,
          cursor: "",
          search: this.props.searchText,
        }}
      >
        {
          ({ data: { get_whitelist_user }, loading, error, fetchMore }) => {
            if (loading) return <TKPLoader />
            if (error) return <Text>Error :(</Text>

            if (get_whitelist_user.data.length === 0) {
              return <NoSearch />
            }

            return (
              <FlatList
              style={{paddingTop: 10}}
                data={get_whitelist_user.data}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                contentContainerStyle={{
                  paddingBottom: 110,
                }}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                  console.log('onEndReached')
                  fetchMore({
                    query: TOP_PROFILE_QUERY,
                    variables: {
                      cursor: get_whitelist_user.lastCursor,
                      limit: 20,
                      search: this.props.searchText,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      console.log(fetchMoreResult)
                      const prevUserData = previousResult.get_whitelist_user.data
                      const newUserData = fetchMoreResult.get_whitelist_user.data
                      const newCursor = fetchMoreResult.get_whitelist_user.lastCursor
                      console.log(newCursor)

                      if (!newCursor) {
                        return {
                          get_whitelist_user: {
                            ...previousResult.get_whitelist_user,
                            data: [...prevUserData]
                          }
                        }
                      }

                      console.log('NEW', fetchMoreResult)
                      console.log('PREV', previousResult)

                      const result = {
                        get_whitelist_user: {
                          ...previousResult.get_whitelist_user,
                          data: [...prevUserData, ...newUserData],
                          lastCursor: newCursor,
                        }

                      }
                      return result;
                    }
                  })
                }}
              />
            )
          }
        }
      </Query>
    )
  }
}

export default TopProfileContainer