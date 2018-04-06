import React from 'react'
import { ScrollView, View, FlatList, Text, Image, StyleSheet, Dimensions,ActivityIndicator,Button } from 'react-native'
import Category from './Category'
import { graphql } from 'react-apollo'
import result from 'lodash/result';

import { CATEGORY_QUERY } from '../queries'

let { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
    height: 104,
    width: width/3,
    margin: 2
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

class Categories extends React.Component{
  constructor(props) {
    super(props)
  }
  onLoadMore(){
    this.props.fetchMore({
      variables: { limit: 20, cursor: this.props.lastCursor, idcategory: this.props.parent},
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
              get_discovery_kol_data: Object.assign({}, prev.get_discovery_kol_data, {
                postKol: prev.get_discovery_kol_data.postKol.concat(fetchMoreResult.get_discovery_kol_data.postKol)  || [],
                lastCursor: fetchMoreResult.get_discovery_kol_data.lastCursor || '',
              })
            });
       }
    })
  }

  render(){
    const categories = this.props.postKol
    return(
      <View style={styles.container}>
      <Button title="Load More" onPress={()=>{this.onLoadMore()}}/>
      { this.props.loading ? 
        <View style={styles.horizontal}>
            <ActivityIndicator size="large" color="#00ff00" />
      </View> : 
       <FlatList  numColumns = {3} data = {categories} renderItem = {(info) => {
          return <Image key={info.index} source={{uri: info.item.content[0].imageurl}} style={styles.image}/>
        }}
      />
    }
</View>
    )
    
  }
}

const mapPropsToOptions = ({ parent }) => {
	return ({
		variables: { limit: 20, cursor: "", idcategory: parent}
	})
}

const mapResultsToProps = ({ data }) => {
	return ({
		loading: data.loading,
		postKol: result(data, 'get_discovery_kol_data.postKol', []),
    lastCursor: result(data, 'get_discovery_kol_data.lastCursor', ''),
    errors: result(data, 'get_discovery_kol_data.errors', null),
    fetchMore:data.fetchMore
	})
	
}

export default graphql(CATEGORY_QUERY, 
  { options: mapPropsToOptions, props: mapResultsToProps })(Categories)
