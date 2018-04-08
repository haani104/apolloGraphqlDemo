import React from 'react'
import { ScrollView, Text, View, FlatList } from 'react-native'
import { Chip } from 'unify-react-native'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import TKPLoader from './TKPLoader'
import NoSearch from './NoSearchResult'

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
    <View>
      <Text>{item.userName}</Text>
      <Text>{item.info}</Text>
    </View>
  )

  _keyExtractor = (item, index) => index

  render() {
    return (
      <Query
        query={TOP_PROFILE_QUERY}
        variables={{
          limit: 15,
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
                data={get_whitelist_user.data}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                
              />
            )
          }
        }
      </Query>
    )
  }
}

export default TopProfileContainer