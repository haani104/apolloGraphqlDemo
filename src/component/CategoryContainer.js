import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Chip } from 'unify-react-native'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import ContentList from './ContentList'

const CATEGORY_QUERY = gql` query getContent($limit: Int!, $cursor: String, $idcategory: Int!, $search: String) {
    get_discovery_kol_data(limit: $limit, cursor: $cursor, idcategory: $idcategory, search: $search) {
      error
      categories {
        id
        name
      }
    }
  }`

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: 0
    }
  }

  setCatId = (id) => {
    if (id === this.state.activeId) {
      this.setState({
        activeId: 0
      })
    } else {
      this.setState({
        activeId: id
      })
    }
  }

  render() {
    return (
      <Query
        query={CATEGORY_QUERY}
        variables={{
          limit: 15,
          cursor: "",
          idcategory: 0,
        }}
      >
        {
          ({ loading, error, data }) => {
            if (loading) return null
            if (error) return <Text>`Error! ${error.message}`</Text>

            const categoriesData = data.get_discovery_kol_data.categories || []

            return (
              <View style={{ paddingTop: 16 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {
                    categoriesData.map(c => {
                      return (
                        <View style={{
                          marginHorizontal: 4,
                        }} key={c.id}>
                          <Chip
                            onPress={() => this.setCatId(c.id)}
                            active={this.state.activeId === c.id ? true : false}
                            key={c.id}
                          >{c.name}
                          </Chip>
                        </View>
                      )
                    })
                  }
                </ScrollView>
                <ContentList
                  catId={this.state.activeId}
                  searchText={this.props.searchText}
                />
              </View>
            )
          }
        }
      </Query>
    )
  }
}

export default CategoryContainer
